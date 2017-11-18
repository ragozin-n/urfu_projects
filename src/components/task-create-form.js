import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import {
	Container,
	Header,
	Left,
	Body,
	Content,
	Button,
	Icon,
	Title,
	Text,
	Right
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {taskUpdate, taskCreate} from '../actions';
import TaskForm from './task-form';

class TaskCreateForm extends Component {

	// Handlers
	handleCreateButton = () => {
		const {name, count, priority} = this.props;
		this.props.taskCreate({name, count, priority: priority || 'high'});
	}

	handleBackButton = () => {
		Actions.main();
	}

	render() {
		return (
			<Container style={styles.containerStyle}>
				<Header style={styles.headerStyle}>
					<Left>
						<Button transparent onPress={this.handleBackButton}>
							<Icon name="arrow-back" style={{color: (Platform.OS === 'android') ? 'white' : 'black'}}/>
						</Button>
					</Left>
					<Body>
						<Title>Create</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					{/* Content */}
					<TaskForm {...this.props}/>
					<Button success style={styles.buttonStyle} onPress={this.handleCreateButton}>
						<Text>Submit</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: 'rgba(253, 255, 252, 1)'
	},
	headerStyle: {
		backgroundColor: 'rgba(231, 29, 54, 1)'
	},
	buttonStyle: {
		margin: 15,
		alignSelf: 'center',
		padding: 25
	}
};

const mapStateToProps = ({taskForm}) => {
	const {name, count, priority} = taskForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {
	taskUpdate,
	taskCreate
})(TaskCreateForm);
