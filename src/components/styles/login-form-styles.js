import {StyleSheet, Platform} from 'react-native';
import {
	LOGIN_BUTTON_COLOR,
	LOGIN_BUTTON_TEXT_COLOR,
	PASSWORD_RESTORE_TEXT_COLOR,
	INPUT_ICON_COLOR,
	INPUT_COLOR
} from '../styles';

export default StyleSheet.create({
	loginButtonStyle: {
		marginTop: 60,
		backgroundColor: LOGIN_BUTTON_COLOR,
		borderRadius: (Platform.OS === 'ios') ? 6 : 0
	},
	formStyle: {
		marginLeft: 25,
		marginRight: 25,
		marginTop: 60
	},
	logoStyle: {
		height: 110,
		resizeMode: 'contain',
		alignSelf: 'center',
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 40,
		marginTop: (Platform.OS === 'ios') ? 150 : 80
	},
	loginButtonTextStyle: {
		color: LOGIN_BUTTON_TEXT_COLOR,
		fontSize: 17
	},
	backgroundGradientStyle: {
		flex: 1
	},
	passwordRestoreTextStyle: {
		color: PASSWORD_RESTORE_TEXT_COLOR,
		fontSize: 15
	},
	passwordRestoreStyle: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 10
	},
	itemFixStyle: {
		marginLeft: 0
	},
	inputIconStyle: {
		color: INPUT_ICON_COLOR
	},
	inputStyle: {
		color: INPUT_COLOR
	},
	animatedViewStyle: {
		flex: 1
	},
	spinnerStyle: {
		marginTop: 20
	}
});
