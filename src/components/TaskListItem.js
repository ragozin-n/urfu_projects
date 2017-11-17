import React, {Component} from 'react';
import {StyleSheet, Alert} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	ListItem, 
	Left, 
	Body, 
	Right, 
	Text, 
	Thumbnail,
	Button
} from 'native-base';

class TaskListItem extends Component {
	handleRowPress = () => {
		Actions.editTask({task: this.props.task});
	}

	handleApplyAction = name => {
		Alert.alert(
			`Project ${name}`,
			'Handle apply action',
			[],
			{ cancelable: true }
		)
	}

	render() {
		const {name} = this.props.task;

		return (
			<ListItem avatar style={styles.taskListItem} onPress={this.handleRowPress}>
				<Left>
					<Thumbnail source={require('../images/face.jpg')} />
				</Left>
				<Body>
					<Text>Project name: {name}</Text>
					<Text note>Project description</Text>
				</Body>
				{/* Fix for https://github.com/GeekyAnts/NativeBase/issues/672 */}
				<Right>
					<Button small transparent onPress={() => this.handleApplyAction(name)}>
						<Text note>Apply</Text>
					</Button>
				</Right>
			</ListItem>
		);
	}
};

const styles = StyleSheet.create({
	taskListItem: {
		marginLeft: 0,
		paddingLeft: 0, 
		paddingRight: 0,
		marginRight: 0,
		backgroundColor: 'rgba(253, 255, 252, 1)'
	}
});

export default TaskListItem;
