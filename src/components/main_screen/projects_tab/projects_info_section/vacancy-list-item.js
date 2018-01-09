import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	Right,
	Left,
	Text,
	Body,
	Thumbnail
} from 'native-base';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {applyToProject} from '../../../../actions';

class VacancyListItem extends Component {
	static propTypes = {
		isCurator: PropTypes.bool.isRequired,
		applyToProject: PropTypes.func.isRequired,
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		skills: PropTypes.string.isRequired,
		vacancyUid: PropTypes.string.isRequired,
		projectUid: PropTypes.string.isRequired,
		isAlreadyApplied: PropTypes.bool.isRequired
	}

	state = {
		// eslint-disable-next-line react/destructuring-assignment
		isSelected: this.props.isAlreadyApplied
	}

	handleApplyAction = ({projectUid, vacancyUid}) => {
		const {applyToProject} = this.props;

		this.setState({isSelected: true});
		applyToProject({projectUid, vacancyUid});
		Actions.main();
	}

	handleVacancyPress = ({description, skills, projectUid, vacancyUid}) => {
		Alert.alert(
			`${description}`,
			`Skills: ${skills}\n\nApply for this vacancy?`,
			[
				{text: 'Apply', onPress: () => this.handleApplyAction({projectUid, vacancyUid})},
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
			],
			{cancelable: false}
		);
	}

	showVacancyInfo = ({description, skills}) => {
		Alert.alert(
			`${description}`,
			`Skills: ${skills}\n\n`,
			[
				{text: 'ОК', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
			],
			{cancelable: false}
		);
	}

	render() {
		const {description, skills, name, projectUid, vacancyUid, isCurator} = this.props;
		const {isSelected} = this.state;

		if (isCurator) {
			return (
				<ListItem noBorder avatar onPress={() => this.showVacancyInfo({description, skills})}>
					<Left>
						<Thumbnail
							small
							source={require('../../../../images/circle.png')}
						/>
					</Left>
					<Body style={{borderBottomWidth: 0}}>
						<Text style={{color: '#D34537'}}>
							{name}
						</Text>
					</Body>
					<Right style={{borderBottomWidth: 0}}/>
				</ListItem>);
		}

		return (
			<ListItem noBorder avatar onPress={() => this.handleVacancyPress({description, skills, projectUid, vacancyUid})}>
				<Left>
					<Thumbnail
						small
						source={require('../../../../images/circle.png')}
					/>
				</Left>
				<Body style={{borderBottomWidth: 0}}>
					<Text style={{color: '#CF3F33'}}>
						{`${isSelected ? 'Вы подали заявку на' : 'Занять'} специальность`}
					</Text>
					<Text note style={{color: '#D34537'}}>
						{name}
					</Text>
				</Body>
				<Right style={{borderBottomWidth: 0}}/>
			</ListItem>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {isCurator} = auth.user;

	return {isCurator};
};

export default connect(mapStateToProps, {applyToProject})(VacancyListItem);
