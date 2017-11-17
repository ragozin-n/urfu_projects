import {
	TASK_UPDATE,
	TASK_CREATE,
	TASKS_FETCH_SUCCESS,
	TASK_SAVE_SUCCESS
} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const taskUpdate = ({prop, value}) => {
	return {
		type: TASK_UPDATE,
		payload: {prop, value}
	};
};

export const taskCreate = ({name, count, priority}) => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks`)
			.push({name, count, priority})
			.then(() => {
				dispatch({type: TASK_CREATE});
				Actions.main();
			});
	};
};

export const tasksFetch = () => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks`)
			.on('value', snapshot => {
				dispatch({
					type: TASKS_FETCH_SUCCESS,
					payload: snapshot.val()
				});
			});
	};
};

export const taskSave = ({name, count, priority, uid}) => {
	const {currentUser} = firebase.auth();

	return dispatch => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.set({name, count, priority})
			.then(() => {
				dispatch({type: TASK_SAVE_SUCCESS});
				Actions.main();
			});
	};
};

export const taskDelete = ({uid}) => {
	const {currentUser} = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/tasks/${uid}`)
			.remove()
			.then(() => {
				Actions.main();
			});
	};
};
