import {
	StyleSheet,
	Platform
} from 'react-native';
import {
	HEADER_COLOR,
	PROJECTS_LIST_BACKGROUND_COLOR,
	PROJECTS_LIST_ITEM_BACKGROUND_COLOR
} from './colors';

export default StyleSheet.create({
	headerStyle: {
		backgroundColor: HEADER_COLOR
	},
	containerStyle: {
		backgroundColor: PROJECTS_LIST_BACKGROUND_COLOR
	},
	iconStyle: {
		// Тут тоже можно впилить цвета
		color: (Platform.OS === 'android') ? 'white' : 'black'
	},
	projectListItem: {
		marginLeft: 0,
		paddingLeft: 0,
		paddingRight: 0,
		marginRight: 0,
		backgroundColor: PROJECTS_LIST_ITEM_BACKGROUND_COLOR
	}
});
