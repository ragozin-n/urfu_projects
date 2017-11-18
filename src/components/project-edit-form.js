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
import {projectInfoUpdate, projectSave, projectDelete} from '../actions';
import {ConfirmModal} from './common';
import ProjectForm from './project-form';

class ProjectEditForm extends Component {
	state = {
		showModal: false
	};

	// Handlers
	handleSaveButton = () => {
		const {name, count, priority} = this.props;
		this.props.projectSave({name, count, priority, uid: this.props.project.uid});
	}

	handleModalAccept = () => {
		const {uid} = this.props.project;
		this.props.projectDelete({uid});
		this.setState({showModal: !this.state.showModal});
	}

	handleBackButton = () => {
		Actions.main();
	}

	// REWRITE TO REDUX ACTION
	handleModalWindowToggler = () => {
		this.setState({showModal: !this.state.showModal});
	}

	// Lifecycle methods
	componentWillMount() {
		_.each(this.props.project, (value, prop) => {
			this.props.projectInfoUpdate({prop, value});
		});
	}

	render() {
		const {
			containerStyle,
			headerStyle,
			backArrowStyle,
			subtitleStyle,
			buttonGroupStyle,
			buttonStyle
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
						<Title>About</Title>
						<Subtitle style={subtitleStyle}>{this.props.name}</Subtitle>
					</Body>
					<Right/>
				</Header>
				<Content>
					<ProjectForm/>
					<View style={buttonGroupStyle}>
						<Button style={buttonStyle} success onPress={this.handleSaveButton}>
							<Text>Save changes</Text>
						</Button>
						<Button style={buttonStyle} danger onPress={this.handleModalWindowToggler}>
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
	},
	backArrowStyle: {
		color: (Platform.OS === 'android') ? 'white' : 'black'
	},
	subtitleStyle: {
		color: (Platform.OS === 'android') ? 'white' : 'black'
	}
};

const mapStateToProps = ({projectForm}) => {
	const {name, count, priority} = projectForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {projectInfoUpdate, projectSave, projectDelete})(ProjectEditForm);
