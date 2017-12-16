import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';
import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	FETCH_USER_BIO
} from './types';

// Main login thread
const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	fetchUserBio(dispatch).then(() => Actions.main());
};

// Helper for alert error on device
const alertOnDevice = error => {
	Alert.alert(
		'Oops!',
		error.message,
		[
			{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			{text: 'OK', onPress: () => console.log('OK Pressed')}
		],
		{cancelable: true}
	);
};

// Callback for error
const loginUserFail = (dispatch, err) => {
	dispatch({
		type: LOGIN_USER_FAIL,
		payload: err
	});
};

export const emailChanged = text => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = text => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

// Main login thread
export const loginUser = ({email, password}) => {
	return dispatch => {
		dispatch({type: LOGIN_USER});
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(err => {
				alertOnDevice(err);
				loginUserFail(dispatch, err);
			});
	};
};

// Listen to user information updates
const fetchUserBio = dispatch => new Promise(resolve => {
	const {uid} = firebase.auth().currentUser;
	firebase.database().ref(`/users/${uid}`)
	.on('value', snapshot => {
		dispatch({
			type: FETCH_USER_BIO,
			payload: snapshot.val()
		});
		resolve(snapshot.val());
	});
});
