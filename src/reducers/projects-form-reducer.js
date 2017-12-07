import {
	GET_PROJECT_INFO
} from '../actions/types';

const INITIAL_STATE = {
	currentProject: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_PROJECT_INFO:
			return {...state, currentProject: action.payload};
		default:
			return state;
	}
};
