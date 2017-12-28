import {StyleSheet, Platform} from 'react-native';
import {
	TITLE_COLOR,
	BUTTON_COLOR
} from '../../styles';

export default StyleSheet.create({
	titleStyle: {
		color: TITLE_COLOR
	},
	iconStyle: {
		color: BUTTON_COLOR
	},
	headerStyle: {
		marginTop: (Platform.OS === 'android') ? 15 : 0,
		backgroundColor: 'transparent',
		elevation: 0,
		shadowOpacity: 0,
		shadowColor: 'transparent'
	}
});
