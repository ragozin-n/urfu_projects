import {StyleSheet} from 'react-native';
import {THUMBNAIL_BORDER_COLOR} from '../../styles';

export default StyleSheet.create({
	contentStyle: {
		backgroundColor: 'white',
		padding: 15
	},
	profileViewStyle: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	},
	profileViewImageStyle: {
		borderColor: THUMBNAIL_BORDER_COLOR,
		borderWidth: 2,
		overlayColor: 'white',
		marginBottom: 15
	},
	skillsViewStyle: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'space-between',
		flexWrap: 'wrap'
	},
	skillsItemStyle: {
		margin: 3
	},
	skillsItemTextStyle: {
		color: 'white'
	}
});
