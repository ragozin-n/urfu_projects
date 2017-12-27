import {StyleSheet} from 'react-native';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles';

export default StyleSheet.create({
	headerStyle: {
		backgroundColor: 'transparent',
		elevation: 0,
		shadowOpacity: 0,
		shadowColor: 'transparent',
		borderBottomWidth: 0
	},
	iconStyle: {
		color: 'white'
	},
	titleStyle: {
		color: 'white'
	},
	headerBodyStyle: {
		flex: 3
	},
	appliesListStyle: {
		flex: 1
	},
	appliesEmptyView: {
		flex: 1,
		alignItems: 'center',
		paddingTop: 50
	},
	appliesEmplyViewTextStyle: {
		textAlign: 'center',
		marginBottom: 30
	},
	appliesEmplyViewImageStyle: {
		height: 400
	},
	appliesListItemStyle: {
		marginLeft: 0,
		paddingLeft: 15
	},
	appliesListItemImageStyle: {
		borderColor: THUMBNAIL_BORDER_COLOR,
		borderWidth: 2,
		overlayColor: 'white'
	},
	appliesListItemLeftStyle: {
		position: 'absolute',
		top: 15,
		left: 10
	},
	appliesListItemBodyStyle: {
		borderBottomWidth: 0,
		marginLeft: 45
	},
	appliestListItemFullViewStyle: {
		marginTop: 10
	},
	appliesListItemDividerStyle: {
		marginTop: 10
	},
	appliesListItemBorderFix: {
		borderBottomWidth: 0
	}
});
