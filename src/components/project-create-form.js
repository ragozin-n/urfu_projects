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
	Right,
	Card,
	CardItem
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import faker from 'faker';
import {
	_updateUserBio,
	updateUserBio,
	updateUserAchievements,
	updateUserHistory,
	projectCreate
} from '../actions';
// import ProjectForm from './project-form';

class ProjectCreateForm extends Component {
	componentDidMount() {
		faker.locale = 'ru';
	}

	// Handlers
	handleCreateButton = () => {
		// const {name, count, priority} = this.props;
		// this.props.projectCreate({name, count, priority: priority || 'high'});
	}

	handleBackButton = () => {
		Actions.main();
	}

	handleGenerateName = () => {
		const randomUserName = faker.name.findName();
		const randomImage = faker.image.dataUri(200, 200);

		this.props._updateUserBio({
			name: randomUserName,
			photoBase64: randomImage
		});

		this.props.updateUserBio({prop: 'name', value: randomUserName});
		this.props.updateUserBio({prop: 'photoBase64', value: randomImage});
	}

	handleGenerateAchievement = () => {
		const randomAchievementName = faker.lorem.words(2);
		const randomImage = faker.image.dataUri(200, 200);

		this.props.updateUserAchievements({
			name: randomAchievementName,
			photoBase64: randomImage
		});
	}

	handleGenerateHistory = () => {
		console.log('Not implemented yet');
	}

	handleGenerateEvent = () => {
		const randomEventName = faker.lorem.words(3);
		const randomDescription = faker.lorem.sentence(5);
		const randomImage = faker.image.dataUri(200, 200);

		this.props.projectCreate({
			name: randomEventName,
			description: randomDescription,
			photoBase64: randomImage
		});
	}

	render() {
		const {
			containerStyle,
			headerStyle,
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
						<Title>_DEBUG-TOOLS</Title>
					</Body>
				</Header>
				<Content>
					<Text>User section</Text>
					<Button block light onPress={this.handleGenerateName}>
						<Text>Generate user name</Text>
					</Button>
					<Button block warning onPress={this.handleGenerateAchievement}>
						<Text>Generate achievement</Text>
					</Button>
					<Button block primary onPress={this.handleGenerateHistory}>
						<Text>Generate history</Text>
					</Button>

					<Text>Project section</Text>

					<Button full light onPress={this.handleGenerateEvent}>
						<Text>Generate event</Text>
					</Button>
					{/* <ProjectForm {...this.props}/>
					<Button success style={buttonSuccessStyle} onPress={this.handleCreateButton}>
						<Text>Submit</Text>
					</Button> */}
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

const mapStateToProps = ({user}) => {
	const {name, photoBase64, achievements, history} = user;
	return {name, photoBase64, achievements, history};
};

export default connect(mapStateToProps, {
	_updateUserBio,
	updateUserBio,
	updateUserAchievements,
	updateUserHistory,
	projectCreate
})(ProjectCreateForm);
