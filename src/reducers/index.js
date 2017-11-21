import {combineReducers} from 'redux';
import AuthReducer from './auth-reducer';
import ProjectFormReducer from './projects-form-reducer';
import ProjectReducer from './project-reducer';
import UserReducer from './user-reducer';

export default combineReducers({
	auth: AuthReducer,
	projectForm: ProjectFormReducer,
	projects: ProjectReducer,
	user: UserReducer
});
