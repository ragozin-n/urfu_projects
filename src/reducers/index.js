import {combineReducers} from 'redux';
import AuthReducer from './auth-reducer';
import ProjectReducer from './project-reducer';
import UserReducer from './user-reducer';

export default combineReducers({
	auth: AuthReducer,
	projects: ProjectReducer,
	user: UserReducer
});
