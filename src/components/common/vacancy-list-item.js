import React, {Component} from 'react';
import {ListItem, Right, Left, Button, Icon, Text} from 'native-base';
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
		this.props.applyToProject({projectUid, vacancyUid});
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
			<ListItem onPress={() => this.handleVacancyPress({description, skills, projectUid, vacancyUid})}>
				<Left>
					<Button small transparent>
						<Icon name={this.state.isSelected ? 'checkmark-circle' : 'radio-button-off'}/>
					</Button>
				</Left>
				<Text>{name}</Text>
				<Right/>
			</ListItem>
		);
	}
}

export default connect(null, {applyToProject})(VacancyListItem);
