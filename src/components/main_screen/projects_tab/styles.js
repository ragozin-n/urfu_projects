import {
	StyleSheet
} from 'react-native';
import {
	HEADER_COLOR,
	PROJECTS_LIST_BACKGROUND_COLOR,
	ICON_ACTIVE_COLOR
} from '../../styles';

export default StyleSheet.create({
	headerStyle: {
		backgroundColor: HEADER_COLOR
	},
	containerStyle: {
		backgroundColor: PROJECTS_LIST_BACKGROUND_COLOR
	},
	projectListItem: {
		marginLeft: 0,
		paddingLeft: 15,
		paddingRight: 0,
		marginRight: 0,
		borderBottomWidth: 0,
		borderColor: 'transparent'
	},
	tabBarUnderlineStyle: {
		backgroundColor: ICON_ACTIVE_COLOR
	}
});
