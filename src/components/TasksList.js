import React, {Component} from 'react';
import {FlatList, Platform} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container, 
	Header, 
	Content, 
	Left, 
	Body, 
	Right, 
	Title, 
	Icon,
	Button
} from 'native-base';
import {connect} from 'react-redux';
import {tasksFetch} from '../actions';
import _ from 'lodash';
import TaskListItem from './TaskListItem';

class TasksList extends Component {

	//Handlers
	handleAddTaskEvent = () => {
		Actions.createTask();
	}

	renderRow(task) {
		return <TaskListItem task={task}/>;
	}

	//Lifecycle methods
	componentWillMount() {
		this.props.tasksFetch();
	}

	render() {
		return (
			<Container style={styles.containerStyle}>
				<Header style={styles.headerStyle}>
					<Left />
					<Body>
						<Title>Projects</Title>
					</Body>
					<Right>
						<Button transparent onPress={this.handleAddTaskEvent}>
							<Icon name='add' style={{ color: (Platform.OS === 'android') ? 'white' : 'black' }} />
						</Button>
					</Right>
				</Header>
				<Content>
					<FlatList
						data={this.props.tasks}
						renderItem={({item}) => this.renderRow(item)}
						keyExtractor={(item) => item.uid}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = {
	headerStyle: {
		backgroundColor: 'rgba(231, 29, 54, 1)'
	},
	containerStyle: {
		backgroundColor: 'rgba(253, 255, 252, 1)'
	}
};

const mapStateToProps = state => {
	const tasks = _.map(state.tasks, (val, uid) => {
		return {...val, uid};
	});

	return {tasks};
};

export default connect(mapStateToProps, {tasksFetch})(TasksList);
