import {
	PROJECT_INFO_UPDATE,
	PROJECT_CREATE,
	PROJECT_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
	name: '',
	count: 0,
	priority: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROJECT_INFO_UPDATE:
			return {...state, [action.payload.prop]: action.payload.value};
		case PROJECT_SAVE_SUCCESS:
		case PROJECT_CREATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};
