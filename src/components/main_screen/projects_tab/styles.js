import {StyleSheet} from 'react-native';
import {
	HEADER_COLOR,
	PROJECTS_LIST_BACKGROUND_COLOR,
	ICON_ACTIVE_COLOR,
	THUMBNAIL_BORDER_COLOR
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
	},
	gradientStyle: {
		flex: 1
	},
	tabContainerStyle: {
		shadowOpacity: 0,
		elevation: 0,
		shadowColor: 'transparent'
	},
	tabHeadingStyle: {
		backgroundColor: 'transparent'
	},
	backgroundImageStyle: {
		position: 'absolute',
		top: -255,
		left: -100
	},
	fabStyle: {
		backgroundColor: 'red'
	},
	listItemImageStyle: {
		borderColor: THUMBNAIL_BORDER_COLOR,
		borderWidth: 2,
		overlayColor: 'white'
	},
	listItemBorderFix: {
		borderBottomWidth: 0
	},
	listItemAnnotationTextStyle: {
		color: 'red'
	}
});
