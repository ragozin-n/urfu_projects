import React, {Component} from 'react';
import {View, Platform} from 'react-native';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Right,
	Title,
	Icon,
	Button,
	Text,
	Subtitle
} from 'native-base';
import {taskUpdate, taskSave, taskDelete} from '../actions';
import {ConfirmModal} from './common';
import TaskForm from './task-form';

class TaskEditForm extends Component {
	state = {
		showModal: false
	};

	// Handlers
	handleSaveButton = () => {
		const {name, count, priority} = this.props;
		this.props.taskSave({name, count, priority, uid: this.props.task.uid});
	}

	handleModalAccept = () => {
		const {uid} = this.props.task;
		this.props.taskDelete({uid});
		this.setState({showModal: !this.state.showModal});
	}

	handleBackButton = () => {
		Actions.main();
	}

	// Rewrite to Redux action
	handleModalWindowToggler = () => {
		this.setState({showModal: !this.state.showModal});
	}

	// Lifecycle methods
	componentWillMount() {
		_.each(this.props.task, (value, prop) => {
			this.props.taskUpdate({prop, value});
		});
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
						<Title>About</Title>
						<Subtitle style={{color: (Platform.OS === 'android') ? 'white' : 'black'}}>{this.props.name}</Subtitle>
					</Body>
					<Right/>
				</Header>
				<Content>
					{/* Content */}
					<TaskForm/>
					<View style={styles.buttonGroupStyle}>
						<Button style={styles.buttonStyle} success onPress={this.handleSaveButton}>
							<Text>Save changes</Text>
						</Button>
						<Button style={styles.buttonStyle} danger onPress={this.handleModalWindowToggler}>
							<Text>Delete</Text>
						</Button>
					</View>
					<ConfirmModal
						visible={this.state.showModal}
						onAccept={this.handleModalAccept}
						onReject={this.handleModalWindowToggler}
					>
						<Text>Are you sure?</Text>
					</ConfirmModal>
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
	buttonGroupStyle: {
		flex: 1,
		flexDirection: 'row'
	},
	buttonStyle: {
		flex: 0.5,
		justifyContent: 'center',
		margin: 15
	}
};

const mapStateToProps = state => {
	const {name, count, priority} = state.taskForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {taskUpdate, taskSave, taskDelete})(TaskEditForm);
