import React, {Component} from 'react';
import {ListItem, Right, Left, Button, Toast, Text, Body, Thumbnail} from 'native-base';
import {connect} from 'react-redux';
import {Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {applyToProject} from '../../actions';

class VacancyListItem extends Component {
	state = {
		isSelected: this.props.isAlreadyApplied
	}

	handleApplyAction = ({projectUid, vacancyUid}) => {
		this.setState({isSelected: true});
		try {
			this.props.applyToProject({projectUid, vacancyUid});
		} catch (err) {
			debugger;
			Toast.show({
				text: err.message,
				position: 'bottom',
				buttonText: 'Okay'
			});
		}
		Actions.main();
	}

	handleVacancyPress = ({description, skills, projectUid, vacancyUid}) => {
		Alert.alert(
			`${description}`,
			`SKILLS:${skills}\n\nApply for this vacancy?`,
			[
				{text: 'Apply', onPress: () => this.handleApplyAction({projectUid, vacancyUid})},
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
			],
			{cancelable: false}
		);
	}

	render() {
		const {description, skills, name, projectUid, vacancyUid} = this.props;

		return (
			<ListItem noBorder avatar onPress={() => this.handleVacancyPress({description, skills, projectUid, vacancyUid})}>
				<Left>
					<Thumbnail
						small
						source={require('../../images/circle.png')}
					/>
				</Left>
				<Body style={{borderBottomWidth: 0}}>
					<Text style={{color: '#CF3F33'}}>{this.state.isSelected ? 'Вами занята' : 'Занять'} специальность:</Text>
					<Text note style={{color: '#D34537'}}>{name}</Text>
				</Body>
				<Right style={{borderBottomWidth: 0}}/>
			</ListItem>
		);
	}
}

export default connect(null, {applyToProject})(VacancyListItem);
