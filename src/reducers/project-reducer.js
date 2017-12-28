import _ from 'lodash';
import {
	PROJECTS_FETCH_SUCCESS,
	PROJECTS_FILTER,
	CURATOR_PROJECT_FETCH
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
	filteredProjects: [],
	_curatorProjects: [],
	initProjects: []
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case PROJECTS_FETCH_SUCCESS:
			INITIAL_STATE.initProjects = _.isEmpty(action.initProjects) ? action.projects : action.initProjects;
			return {...state, data: action.projects, filteredProjects: _.isEmpty(action.initProjects) ? action.projects : action.initProjects};
		case PROJECTS_FILTER:
			return {...state, filteredProjects: action.payload === undefined ? INITIAL_STATE.initProjects : action.payload};
		case CURATOR_PROJECT_FETCH:
			return {...state, _curatorProjects: action.payload};
		default:
			return state;
	}
};
