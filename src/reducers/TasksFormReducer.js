import {
	TASK_UPDATE,
	TASK_CREATE,
	TASK_SAVE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {
	name: '',
	count: 0,
	priority: ''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TASK_UPDATE:
			// ES6 key interpolation
			return {...state, [action.payload.prop]: action.payload.value};
		case TASK_SAVE_SUCCESS:
		case TASK_CREATE:
			return INITIAL_STATE;
		default:
			return state;
	}
};
