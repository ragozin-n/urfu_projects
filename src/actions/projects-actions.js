import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_INFO_UPDATE,
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECT_SAVE_SUCCESS,
	PROJECTS_FILTER
} from './types';

export const projectInfoUpdate = ({prop, value}) => {
	return {
		type: PROJECT_INFO_UPDATE,
		payload: {prop, value}
	};
};

export const projectCreate = ({name, description, photoBase64}) => {
	return dispatch => {
		firebase.database().ref(`/events`)
			.push({name, description, photoBase64})
			.then(() => {
				dispatch({type: PROJECT_CREATE});
				Actions.main();
			});
	};
};

export const projectsFetch = () => {
	// GET GLOBAL EVENTS
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

export const projectsFilter = (searchString, arr) => {
	if (!searchString) {
		return {
			type: PROJECTS_FILTER,
			payload: arr
		};
	}

	const filteredProjects = arr.filter(project =>
		project.name.toLowerCase().includes(searchString.toLowerCase())
	);

	return {
		type: PROJECTS_FILTER,
		payload: filteredProjects
	};
};

// -----------DEPRECATED-----------

export const projectSave = ({name, count, priority, uid}) => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.set({name, count, priority})
			.then(() => {
				dispatch({type: PROJECT_SAVE_SUCCESS});
				Actions.main();
			});
	};
};

export const projectDelete = ({uid}) => {
	const {currentUser} = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.remove()
			.then(() => {
				Actions.main();
			});
	};
};
