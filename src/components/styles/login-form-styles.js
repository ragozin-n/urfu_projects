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
		marginTop: '25%',
		width: '100%',
		backgroundColor: LOGIN_BUTTON_COLOR,
		alignSelf: 'center',
		justifyContent: 'center',
		borderRadius: (Platform.OS === 'ios') ? 6 : 0
	},
	formStyle: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: '10%',
		marginRight: '10%',
		padding: 0,
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
		fontFamily: 'Roboto',
		fontSize: 17
	},
	backgroundGradientStyle: {
		flex: 1,
		flexDirection: 'column',
		margin: 0
	},
	passwordRestoreTextStyle: {
		color: PASSWORD_RESTORE_TEXT_COLOR,
		fontFamily: 'Roboto',
		fontSize: 15,
		marginBottom: '3%'
	},
	passwordRestoreStyle: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 0
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
		flexDirection: 'column',
		flex: 1
	},
	spinnerStyle: {
		marginTop: 20
	}
});
