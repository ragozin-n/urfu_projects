import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {
	Button,
	Text
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

class ProjectCreateForm extends Component {
	componentDidMount() {
		faker.locale = 'ru';
	}

	// Handlers
	handleBackButton = () => {
		Actions.main();
	}

	handleGenerateUser = ({isCurator}) => {
		const randomUserName = faker.name.findName();
		const randomAvatar = faker.image.dataUri(200, 200);

		this.props._updateUserBio({
			name: randomUserName,
			photoBase64: randomAvatar,
			isCurator
		});
	}

	handleGenerateSkill = () => {
		//
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
		const randomEventName = faker.random.words(2);
		const randomDescription = faker.random.words(4);
		const randomImage = faker.image.dataUri(200, 200);
		const maxMembers = faker.random.number(20);
		const keywords = faker.random.words(5);
		const vacancyCount = faker.random.number({min: 7, max: 10});
		const vacancies = [];

		for (let i = 0; i < vacancyCount; i++) {
			vacancies.push(
				{
					name: faker.name.jobTitle(),
					description: faker.random.words(3),
					skills: faker.random.words(5)
				}
			);
		}

		this.props.projectCreate({
			name: randomEventName,
			description: randomDescription,
			photoBase64: randomImage,
			maxMembers,
			keywords,
			vacancies
		});
	}

	render() {
		return (
			<View>
				<Text>User section</Text>
				<Button block light onPress={() => this.handleGenerateUser({isCurator: false})}>
					<Text>Generate common user</Text>
				</Button>
				<Button block warning onPress={() => this.handleGenerateUser({isCurator: true})}>
					<Text>Generate curator</Text>
				</Button>
				<Button block light onPress={this.handleGenerateSkill}>
					<Text>Generate skill</Text>
				</Button>
				<Button block warning onPress={this.handleGenerateAchievement}>
					<Text>Generate achievement</Text>
				</Button>

				<Text>Globals</Text>
				<Button full danger onPress={this.handleGenerateEvent}>
					<Text>Generate event</Text>
				</Button>
			</View>
		);
	}
}

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
