import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAIL,
	LOGIN_USER,
	FETCH_USER_BIO
} from '../actions/types';

const INITIAL_STATE = {
	email: 'User@test.com',
	password: 'password',
	user: {},
	error: '',
	loading: false,
	_token: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return {...state, email: action.payload};
		case PASSWORD_CHANGED:
			return {...state, password: action.payload};
		case LOGIN_USER_SUCCESS:
			return {
				...state,
				...INITIAL_STATE,
				_token: action.payload
			};
		case LOGIN_USER_FAIL:
			return {...state, error: action.payload, password: '', loading: false};
		case LOGIN_USER:
			return {...state, loading: true, error: ''};
		case FETCH_USER_BIO:
			return {...state, user: action.payload};
		default:
			return state;
	}
};
