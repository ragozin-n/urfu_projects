import {Toast} from 'native-base';
import {ERROR} from '../actions/types';

export const toast = store => next => action => {
	if (action.type === ERROR) {
		Toast.show({
			text: action.payload.message,
			position: 'bottom',
			buttonText: 'Okay'
		});
	}
	console.log('ping');
	return next(action);
};
