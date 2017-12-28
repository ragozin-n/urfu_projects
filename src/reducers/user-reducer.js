import {
	USER_BIO_UPDATE,
	USER_ACHIEVEMENTS_UPDATE,
	USER_HISTORY_UPDATE
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	photoBase64: '',
	achievements: {},
	history: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case USER_BIO_UPDATE:
		case USER_ACHIEVEMENTS_UPDATE:
		case USER_HISTORY_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		default:
			return state;
	}
};
