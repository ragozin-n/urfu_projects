import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	APPLY_TO_PROJECT_SUCCESS,
	CURATOR_PROJECT_FETCH,
	CURATOR_BIO_FETCH
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
		// 3 steps to apply to projectUid project.
		// 1. Update candidates array in projectUid
		const {uid} = firebase.auth().currentUser;

		const projectRef = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}/candidates`);
		console.log({[uid]: true});
		projectRef.update(
			{
				[uid]: true
			}
		);

		// 2. Verify for myProjects length
		const userAllProjectsRef = firebase.database().ref(`/users/${uid}/myProjects/`);

		userAllProjectsRef.once('value', data => {
			console.log(data.val());
		});

		// 3. Update currentUser.myProjects array
		const userThisProjectRef = firebase.database().ref(`/users/${uid}/myProjects/${projectUid}`);
		userThisProjectRef.update(
			{
				[vacancyUid]: true
			}
		);

		dispatch({type: APPLY_TO_PROJECT_SUCCESS});
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

	const filteredProjects = arr.filter(project =>
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
			dispatch({type: CURATOR_PROJECT_FETCH, payload: projects});
			Actions.appliesForm({applies: projects, currentProject});
		});
	};
};

const _searchForCandidates = uid => new Promise(resolve => {
	// Не понимаю как сделать сложный запрос пока
	firebase.database().ref(`/events`).orderByChild('createdBy').equalTo(uid).on('value', snapshot => {
		const projects = _.map(snapshot.val(), (value, key) => ({key, value}));
		const curatorProjects = [];
		projects.forEach(project => {
			const vacancies = _.map(project.value.vacancies, (value, key) => ({key, value}));
			vacancies.forEach(vacancy => {
				const candidates = _.map(vacancy.value.candidates, (value, key) => ({key, value}));
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
