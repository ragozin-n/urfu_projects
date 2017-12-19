import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	APPLY_TO_PROJECT_SUCCESS,
	CURATOR_PROJECT_FETCH,
	USER_HIRED,
	PROJECT_UPDATE,
	ERROR
} from './types';

// Curator create project
export const projectCreate = ({name, description, photoBase64, maxMembers, keywords, vacancies}) => {
	return dispatch => {
		const currentEventKey = firebase.database().ref(`/events`).push().key;
		const currentEventRef = firebase.database().ref(`/events/${currentEventKey}`);
		const {uid} = firebase.auth().currentUser;
		const currentVacanciesRef = firebase.database().ref(`/events/${currentEventKey}/vacancies`);

		currentEventRef.set(
			{
				name,
				description,
				photoBase64,
				maxMembers,
				keywords,
				createdBy: uid,
				members: {}
			}
		);

		vacancies.forEach(element => {
			currentVacanciesRef.push(
				{
					name: element.name,
					description: element.description,
					skills: element.skills
				}
			);
		});

		dispatch({type: PROJECT_CREATE});
		Actions.main();
	};
};

// Students apply for project
export const applyToProject = ({projectUid, vacancyUid}) => {
	return dispatch => {
		debugger;
		const {uid} = firebase.auth().currentUser;

		// 1. Verify user
		_isUserCanApplyToProject(uid, projectUid)
			.then(() => {
				debugger;
				const projectRef = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}/candidates`);
				console.log({[uid]: true});
				projectRef.update(
					{
						[uid]: true
					}
				);

				const userProjectRef = firebase.database().ref(`/users/${uid}/myProjects/`);
				userProjectRef.update(
					{
						[projectUid]: false
					}
				);

				dispatch({type: APPLY_TO_PROJECT_SUCCESS});
			}, err => dispatch({type: ERROR, payload: err}));
	};
};

// Curator hire student to his project
export const hireStudentToProject = ({projectUid, vacancyUid, studentUid}) => {
	// 1. Student is open for hire
	return dispatch => {
		_isUserCanApplyToProject(studentUid, projectUid)
			.then(() => {
				// 2. If student open for hire set /myProjects/projectUid value to true, whick means student current project is projectUid
				debugger;
				firebase.database().ref(`/users/${studentUid}/myProjects`)
					.update({
						[projectUid]: true
					});
				// 3. Close curent vacancy (set value to null delete key)
				const vacancy = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}`);
				vacancy
					.update({
						employedBy: studentUid
					});
				vacancy.child('candidates').remove();
				dispatch({type: USER_HIRED});
			}, err => dispatch({type: ERROR, payload: err}));
	};
};

// Get global events from database with callback
export const projectsFetch = ({isCurator, uid}) => {
	const eventsRef = firebase.database().ref(`/events`);

	return dispatch => {
		eventsRef
			.on('value', snapshot => {
				if (isCurator) {
					const initProjects = _.map(snapshot.val(), (val, uid) => {
						return {...val, uid};
					}).filter(project => project.createdBy === uid);
					dispatch({
						type: PROJECTS_FETCH_SUCCESS,
						projects: snapshot.val(),
						initProjects
					});
				} else {
					const projects = _.map(snapshot.val(), (val, uid) => ({...val, uid}));
					dispatch({
						type: PROJECTS_FETCH_SUCCESS,
						projects
					});
				}
			});
	};
};

// Filter projects
export const projectsFilter = (searchString, arr) => {
	if (!searchString) {
		return {
			type: PROJECTS_FILTER
		};
	}

	// Fast-filter
	const filteredProjects = arr.filter(
		project =>
			project.keywords.toLowerCase().includes(searchString.toLowerCase()) ||
			project.name.toLowerCase().includes(searchString.toLowerCase()) ||
			project.keywords.includes(searchString.toLowerCase())
	);

	return {
		type: PROJECTS_FILTER,
		payload: filteredProjects
	};
};

export const getCandidates = ({uid, isCurator, currentProject}) => {
	if (!isCurator) {
		throw new Error(`${uid} trying to fetch curator events, while isCurator field is false`);
	}
	return async dispatch => {
		try {
			const projects = await _searchForCandidates({uid, projectUid: currentProject.uid});

			// Нельзя фильтровать массив асинхронно. Поэтому тут я написал хелпер для этой операции на промисах.
			const result = await filter(projects, async item => {
				return _isUserActiveProjectIsThis(item.candidate.key, currentProject.uid);
			});
			dispatch({type: CURATOR_PROJECT_FETCH, payload: result});
			Actions.appliesForm({applies: result, currentProject, uid});
		} catch (err) {
			dispatch({type: ERROR, payload: err});
		}
	};
};

// Хелпер для асинхронной фильтрации массива
async function filter(arr, callback) {
	return (await Promise.all(arr.map(async item => {
		return (await callback(item)) ? item : undefined;
	}))).filter(i => i !== undefined);
}

const _searchForCandidates = ({projectUid}) => new Promise(resolve => {
	const candidates = [];
	// Просто ужасная функция, но иначе на текущий момент в firebase нельзя. Слишком вложенные данные.

	// Берем свободные вакансии
	firebase.database().ref(`/events/${projectUid}/vacancies`).orderByChild('employedBy').equalTo('').once('value', snapshot => {
		// Для каждой вакансии
		snapshot.forEach(vacancy => {
			const _vacancy = vacancy.val();
			// Добавляем к каждой вакансии uid, для обратно связи
			_vacancy.uid = vacancy.key;

			// Бежим по кандидатам
			const _candidates = _.map(vacancy.val().candidates, (value, key) => ({key, value}));

			// Если на вакансию есть хотя бы 1 заявка
			if (_candidates.length > 0) {
				_candidates.forEach(candidate => {
					candidates.push({
						vacancy: _vacancy,
						candidate
					});
				});
			}
		});
		resolve(candidates);
	});
});

const _isUserCanApplyToProject = (uid, projectUid) => new Promise((resolve, reject) => {

	// Check for user status
	firebase.database().ref(`/users/${uid}`).once('value', snapshot => {
		if (snapshot.val().isCurator) {
			reject(new Error('Curators dont have persimmisions to apply'));
		}
	});

	// Check for student status
	firebase.database().ref(`/users/${uid}/myProjects`).once('value', snapshot => {
		const userApplies = _.map(snapshot.val(), (value, key) => ({key, value}));
		debugger;
		if (userApplies.filter(project => project.value === true && project.key !== projectUid).length > 0) {
			reject(new Error('User already in project.'));
		}
		if (userApplies.length === 3 && userApplies.filter(project => project.key === projectUid).length === 0) {
			reject(new Error('Max applies count reached.'));
		}
		resolve(userApplies);
	});
});

export const _updateProject = projectUid => new Promise(resolve => {
	firebase.database().ref(`/events/${projectUid}`).once('value', snapshot => {
		const project = snapshot.val();
		project.uid = projectUid;
		resolve(project);
	});
});

// Return true if active project !== projectUid
const _isUserActiveProjectIsThis = (uid, projectUid) => new Promise(resolve => {
	firebase.database().ref(`/users/${uid}/myProjects`).once('value', async snapshot => {
		const userApplies = await _.map(snapshot.val(), (value, key) => ({key, value}));
		resolve(userApplies.filter(item => item.value === true && item.key !== projectUid).length === 0);
	});
});
