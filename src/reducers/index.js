import {combineReducers} from 'redux';
import AuthReducer from './auth-reducer';
import TaskFormReducer from './tasks-form-reducer';
import TaskReducer from './task-reducer';

export default combineReducers({
	auth: AuthReducer,
	taskForm: TaskFormReducer,
	tasks: TaskReducer
});
