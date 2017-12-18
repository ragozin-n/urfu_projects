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
		const {uid} = firebase.auth().currentUser;

		// 1. Verify user
		_isUserCanApplyToProject(uid, projectUid)
			.then(() => {
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
					dispatch({
						type: PROJECTS_FETCH_SUCCESS,
						projects: snapshot.val()
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
	return dispatch => {
		_searchForCandidates(uid)
		.then(projects => {
			const currentProjectCandidates =
				projects.filter(
					project =>
						project.project.value.name === currentProject.name &&
						project.project.value.createdBy === currentProject.createdBy
				);
			dispatch({type: CURATOR_PROJECT_FETCH, payload: currentProjectCandidates});
			Actions.appliesForm({applies: currentProjectCandidates, currentProject, uid});
		});
	};
};

const _searchForCandidates = uid => new Promise(resolve => {
	// Не понимаю как сделать сложный запрос пока
	firebase.database().ref(`/events`).orderByChild('createdBy').equalTo(uid).once('value', snapshot => {
		const projects = _.map(snapshot.val(), (value, key) => ({key, value}));
		const curatorProjects = [];
		projects.forEach(project => {
			const vacancies = _.map(project.value.vacancies, (value, key) => ({key, value}));
			// debugger;
			vacancies.forEach(vacancy => {
				const candidates = _.map(vacancy.value.candidates, (value, key) => ({key, value}));
				// debugger;
				candidates.forEach(candidate => {
					curatorProjects.push(
						{
							project,
							vacancy,
							candidate
						}
					);
				});
			});
		});
		resolve(curatorProjects);
	});
});

const _isUserCanApplyToProject = (uid, projectUid) => new Promise((resolve, reject) => {
	firebase.database().ref(`/users/${uid}/myProjects`).once('value', snapshot => {
		const userApplies = _.map(snapshot.val(), (value, key) => ({key, value}));
		if (userApplies.length === 3 && userApplies[projectUid].value === undefined) {
			reject(new Error('Max applies count reached.'));
		}
		if (userApplies.filter(project => project.value === true && project.key !== projectUid).length > 0) {
			reject(new Error('User already in project.'));
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
