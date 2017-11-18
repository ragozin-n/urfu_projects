import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	PROJECT_INFO_UPDATE,
	PROJECT_CREATE,
	PROJECTS_FETCH_SUCCESS,
	PROJECT_SAVE_SUCCESS
} from './types';

// 1. RENAME URLS FROM 'TASKS' TO 'PROJECTS'

export const projectInfoUpdate = ({prop, value}) => {
	return {
		type: PROJECT_INFO_UPDATE,
		payload: {prop, value}
	};
};

export const projectCreate = ({name, count, priority}) => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks`)
			.push({name, count, priority})
			.then(() => {
				dispatch({type: PROJECT_CREATE});
				Actions.main();
			});
	};
};

export const projectsFetch = () => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks`)
			.on('value', snapshot => {
				dispatch({
					type: PROJECTS_FETCH_SUCCESS,
					payload: snapshot.val()
				});
			});
	};
};

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
