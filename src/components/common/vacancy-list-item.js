import React, {Component} from 'react';
import {ListItem, Right, Left, Button, Icon, Text} from 'native-base';
import {Alert} from 'react-native';

class VacancyListItem extends Component {
	state = {
		isSelected: false
	}

	handleApply = ({description, skills}) => {
		Alert.alert(
			`${description}`,
			`SKILLS:${skills}\n\nApply for this vacancy?`,
			[
				{text: 'Apply', onPress: () => this.setState({isSelected: !this.state.isSelected})},
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}
			],
			{cancelable: false}
		);
	}

	render() {
		const {description, skills, name, uid} = this.props;
		return (
			<ListItem onPress={() => this.handleApply({description, skills})}>
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

export default VacancyListItem;
