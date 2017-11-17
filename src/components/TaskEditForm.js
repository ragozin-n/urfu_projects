import React, {Component} from 'react';
import _ from 'lodash';
import TaskForm from './TaskForm';
import {connect} from 'react-redux';
import {ConfirmModal} from './common';
import {taskUpdate, taskSave, taskDelete} from '../actions';
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
import { Actions } from 'react-native-router-flux';
import {View, Platform} from 'react-native';

class TaskEditForm extends Component {
	state = {showModal: false};

	//Handlers
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

	//Lifecycle methods
	componentWillMount() {
		_.each(this.props.task, (value, prop) => {
			this.props.taskUpdate({ prop, value });
		});
	}

	render() {
		return (
			<Container style={styles.containerStyle}>
				<Header style={styles.headerStyle}>
					<Left>
						<Button transparent onPress={this.handleBackButton}>
							<Icon name='arrow-back' style={{ color: (Platform.OS === 'android') ? 'white' : 'black' }} />
						</Button>
					</Left>
					<Body>
						<Title>About</Title>
						<Subtitle style={{ color: (Platform.OS === 'android') ? 'white' : 'black' }}>{this.props.name}</Subtitle>
					</Body>
					<Right />
				</Header>
				<Content>
					{/* Content */}
					<TaskForm />
						<View style={styles.buttonGroupStyle}>
							<Button style={styles.buttonStyle} success onPress={this.handleSaveButton}>
								<Text>Save changes</Text>
							</Button>
							<Button style={styles.buttonStyle} danger onPress={() => this.setState({ showModal: !this.state.showModal })}>
								<Text>Delete</Text>
							</Button>
						</View>
						<ConfirmModal
							visible={this.state.showModal}
							onAccept={this.handleModalAccept}
							onReject={() => this.setState({ showModal: !this.state.showModal })}
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
