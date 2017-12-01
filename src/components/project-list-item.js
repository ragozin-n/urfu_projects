import React, {Component} from 'react';
import {Alert} from 'react-native';
import {
	ListItem,
	Left,
	Body,
	Right,
	Text,
	Thumbnail,
	Button
} from 'native-base';
import styles from './styles/projects-list-styles';

class ProjectListItem extends Component {

	handleRowPress = () => {
		// Project info logic. May be new screen or modal window.
	}

	handleApplyAction = (name, description) => {
		Alert.alert(
			`${name}`,
			`${description}`,
			[],
			{cancelable: true}
		);
	}

	render() {
		const {name, description} = this.props.project;
		const {projectListItem} = styles;

		return (
			<ListItem avatar style={projectListItem} onPress={this.handleRowPress}>
				<Left>
					<Thumbnail source={require('../images/face.jpg')}/>
				</Left>
				<Body>
					<Text>{name}</Text>
					<Text note>{description}</Text>
				</Body>
				{/* Fix for https://github.com/GeekyAnts/NativeBase/issues/672 */}
				<Right>
					<Button small transparent onPress={() => this.handleApplyAction(name, description)}>
						<Text note>Apply</Text>
					</Button>
				</Right>
			</ListItem>
		);
	}
}

export default ProjectListItem;
