import {combineReducers} from 'redux';
import AuthReducer from './auth-reducer';
import ProjectFormReducer from './projects-form-reducer';
import ProjectReducer from './project-reducer';

export default combineReducers({
	auth: AuthReducer,
	projectForm: ProjectFormReducer,
	projects: ProjectReducer
});
