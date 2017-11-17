import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER
} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';

// Helpers
const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});

	Actions.main();
};

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

const loginUserFail = (dispatch, error) => {
	alertOnDevice(error);

	dispatch({
		type: LOGIN_USER_FAIL
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

export const loginUser = ({email, password}) => {
	return dispatch => {
		dispatch({type: LOGIN_USER});

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(user => loginUserSuccess(dispatch, user))
			.catch(error => {
				alertOnDevice(error);

				firebase.auth().createUserWithEmailAndPassword(email, password)
					.then(user => loginUserSuccess(dispatch, user))
					.catch(error => loginUserFail(dispatch, error));
			});
	};
};
