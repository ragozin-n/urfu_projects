import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {
	USER_BIO_UPDATE,
	USER_ACHIEVEMENTS_UPDATE,
	USER_HISTORY_UPDATE
} from './types';

// User customization actions. May group in one method.
export const updateUserBio = ({prop, value}) => {
	return {
		type: USER_BIO_UPDATE,
		payload: {prop, value}
	};
};

// Using for update users bio. ***DEBUG ONLY***
export const _updateUserBio = ({name, photoBase64, isCurator}) => dispatch => {
	const {currentUser} = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/`)
		.update({name, photoBase64, isCurator})
		.then(() => {
			dispatch({type: USER_BIO_UPDATE, payload: name});
			dispatch({type: USER_BIO_UPDATE, payload: photoBase64});
			Actions.main();
		});
};

// Using for set achievements.
export const updateUserAchievements = ({name, photoBase64}) => dispatch => {
	const {currentUser} = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/achievements`)
		.push({name, photoBase64})
		.then(() => {
			dispatch({type: USER_ACHIEVEMENTS_UPDATE});
			Actions.main();
		});
};

// Using for update user's history.
export const updateUserHistory = ({activity}) => dispatch => {
	const {currentUser} = firebase.auth();

	firebase.database().ref(`/users/${currentUser.uid}/history`)
		.push({activity})
		.then(() => {
			dispatch({type: USER_HISTORY_UPDATE});
			Actions.main();
		});
};
