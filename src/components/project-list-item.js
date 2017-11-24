import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {
	ListItem,
	Left,
	Body,
	Right,
	Text,
	Thumbnail,
	Button
} from 'native-base';

class ProjectListItem extends Component {

	handleRowPress = () => {
		// DEPRECATED
		// Actions.editProject({project: this.props.project});
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

const styles = StyleSheet.create({
	projectListItem: {
		marginLeft: 0,
		paddingLeft: 0,
		paddingRight: 0,
		marginRight: 0,
		backgroundColor: 'rgba(253, 255, 252, 1)'
	}
});

export default ProjectListItem;
