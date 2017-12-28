import {StyleSheet} from 'react-native';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles';

export default StyleSheet.create({
	headerStyle: {
		backgroundColor: 'transparent',
		marginBottom: 100,
		elevation: 0,
		shadowOpacity: 0,
		shadowColor: 'transparent',
		borderBottomWidth: 0
	},
	headerBackIcon: {
		color: 'white'
	},
	contentStyle: {
		backgroundColor: 'white',
		borderTopColor: 'red',
		borderTopWidth: 2
	},
	projectInfoNameView: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'flex-start',
		padding: 15
	},
	projectInfoFabButton: {
		marginTop: 5,
		marginBottom: 5
	},
	projectInfoCounterContainer: {
		flex: 1,
		flexDirection: 'row',
		alignContent: 'space-between'
	},
	projectInfoCounterView: {
		flex: 1,
		flexDirection: 'row',
		alignSelf: 'baseline'
	},
	projectInfoDropDownIcon: {
		fontSize: 21,
		color: 'black'
	},
	projectInfoVacanciesList: {
		flex: 1
	},
	projectInfpDescription: {
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
		alignContent: 'flex-start',
		flexWrap: 'wrap',
		paddingLeft: 15
	},
	skillsItemStyle: {
		margin: 3
	},
	skillsItemTextStyle: {
		color: 'white'
	}
});
