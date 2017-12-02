import {
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
	filteredProjects: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROJECTS_FETCH_SUCCESS:
			return {...state, data: action.payload, filteredProjects: action.payload};
		case PROJECTS_FILTER:
			return {...state, filteredProjects: action.payload};
		default:
			return state;
	}
};
