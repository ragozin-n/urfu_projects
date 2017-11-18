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
import {projectInfoUpdate, projectCreate} from '../actions';
import ProjectForm from './project-form';

class ProjectCreateForm extends Component {

	// Handlers
	handleCreateButton = () => {
		const {name, count, priority} = this.props;
		this.props.projectCreate({name, count, priority: priority || 'high'});
	}

	handleBackButton = () => {
		Actions.main();
	}

	render() {
		const {
			containerStyle,
			headerStyle,
			buttonSuccessStyle,
			backArrowStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				<Header style={headerStyle}>
					<Left>
						<Button transparent onPress={this.handleBackButton}>
							<Icon name="arrow-back" style={backArrowStyle}/>
						</Button>
					</Left>
					<Body>
						<Title>Create</Title>
					</Body>
					<Right/>
				</Header>
				<Content>
					<ProjectForm {...this.props}/>
					<Button success style={buttonSuccessStyle} onPress={this.handleCreateButton}>
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
	buttonSuccessStyle: {
		margin: 15,
		alignSelf: 'center',
		padding: 25
	},
	backArrowStyle: {
		color: (Platform.OS === 'android') ? 'white' : 'black'
	}
};

const mapStateToProps = ({projectForm}) => {
	const {name, count, priority} = projectForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {
	projectInfoUpdate,
	projectCreate
})(ProjectCreateForm);
