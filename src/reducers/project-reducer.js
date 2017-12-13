import {
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	CURATOR_PROJECT_FETCH
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
	filteredProjects: [],
	_curatorProjects: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROJECTS_FETCH_SUCCESS:
			return {...state, data: action.payload, filteredProjects: action.payload};
		case PROJECTS_FILTER:
			return {...state, filteredProjects: action.payload};
		case CURATOR_PROJECT_FETCH:
			return {...state, _curatorProjects: action.payload};
		default:
			return state;
	}
};
