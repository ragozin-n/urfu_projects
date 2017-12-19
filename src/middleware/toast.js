import {Toast} from 'native-base';
// eslint-disable-next-line import/named
import {Audio} from 'expo';
import {ERROR} from '../actions/types';

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

export const toast = store => next => action => {
	if (action.type === ERROR) {
		playErrorSound();
		Toast.show({
			text: action.payload.message,
			position: 'bottom',
			buttonText: 'Okay'
		});
	}
	return next(action);
};
