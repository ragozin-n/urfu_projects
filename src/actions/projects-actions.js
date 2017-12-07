import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	USER_APPLY_TO_PROJECT
} from './types';

// Curator create project
export const projectCreate = ({name, description, photoBase64, maxMembers, keywords, vacancies}) => {
	return dispatch => {
		const currentEventKey = firebase.database().ref(`/events`).push().key;
		const currentEventRef = firebase.database().ref(`/events/${currentEventKey}`);
		const {currentUser} = firebase.auth();
		const currentVacanciesRef = firebase.database().ref(`/events/${currentEventKey}/vacancies`);

		currentEventRef.set(
			{
				name,
				description,
				photoBase64,
				maxMembers,
				keywords,
				createdBy: currentUser.uid
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
	const {uid} = firebase.auth().currentUser;
	const currentRef = firebase.database().ref(`/events/${projectUid}/vacancies/${vacancyUid}/`);

	currentRef.update({wantTo: uid});
	return dispatch => {
		dispatch({type: USER_APPLY_TO_PROJECT});
	};
};

// Get global events from database with callback
export const projectsFetch = () => {
	return dispatch => {
		firebase.database().ref(`/events`)
			.on('value', snapshot => {
				dispatch({
					type: PROJECTS_FETCH_SUCCESS,
					payload: snapshot.val()
				});
			});
	};
};

// Filter projects
export const projectsFilter = (searchString, arr) => {
	if (!searchString) {
		return {
			type: PROJECTS_FILTER,
			payload: arr
		};
	}

	const filteredProjects = arr.filter(project =>
		project.keywords.toLowerCase().includes(searchString.toLowerCase()) ||
		project.name.toLowerCase().includes(searchString.toLowerCase())
	);

	return {
		type: PROJECTS_FILTER,
		payload: filteredProjects
	};
};
