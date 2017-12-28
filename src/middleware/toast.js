import {Toast} from 'native-base';
// eslint-disable-next-line import/named
import {Audio} from 'expo';
import {ERROR_TOAST, SUCCESS_TOAST} from '../actions/types';

const playErrorSound = async () => {
	await Audio.setIsEnabledAsync(true);
	await Expo.Audio.setAudioModeAsync({
		playsInSilentModeIOS: true,
		allowsRecordingIOS: false,
		interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		shouldDuckAndroid: false,
		interruptionModeAndroid: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
	});
	const sound = new Audio.Sound();
	await sound.loadAsync(require('../sounds/error.mp3'));
	await sound.setVolumeAsync(0.6);
	await sound.playAsync();
};

const playSuccessSound = async () => {
	await Audio.setIsEnabledAsync(true);
	await Expo.Audio.setAudioModeAsync({
		playsInSilentModeIOS: true,
		allowsRecordingIOS: false,
		interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
		shouldDuckAndroid: false,
		interruptionModeAndroid: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
	});
	const sound = new Audio.Sound();
	await sound.loadAsync(require('../sounds/success.mp3'));
	await sound.setVolumeAsync(0.6);
	await sound.playAsync();
};

// eslint-disable-next-line no-unused-vars
export const toast = store => next => action => {
	if (action.type === ERROR_TOAST) {
		playErrorSound();
		Toast.show({
			text: action.payload.message,
			position: 'bottom',
			buttonText: 'Okay',
			type: 'danger'
		});
	}
	if (action.type === SUCCESS_TOAST) {
		playSuccessSound();
		Toast.show({
			text: action.payload,
			position: 'bottom',
			buttonText: 'Okay',
			type: 'success'
		});
	}
	return next(action);
};
