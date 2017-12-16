import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
	Button,
	Text,
	Container,
	Content,
	ListItem,
	Separator
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import faker from 'faker';
import {
	_updateUserBio,
	updateUserBio,
	updateUserAchievements,
	updateUserHistory,
	projectCreate,
	getCandidates
} from '../actions';

class ProjectCreateForm extends Component {
	componentDidMount() {
		const {isCurator} = this.props.user;
		const {uid} = this.props._token;
		faker.locale = 'ru';
		this.props.getCandidates({uid, isCurator});
	}

	// Handlers
	handleBackButton = () => {
		Actions.main();
	}

	handleGenerateUser = ({isCurator, name, photoBase64}) => {
		this.props._updateUserBio({
			name,
			photoBase64,
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
		const randomEventName = '';
		const randomDescription = '';
		const randomImage = faker.image.dataUri(200, 200);
		const maxMembers = faker.random.number(20);
		const keywords = '';
		const vacancies = [];

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
		const {isCurator} = this.props.user;
		console.log(this.props._curatorProjects);
		return (
			<Container>
				<Content>
					{isCurator &&
						<View>
							<Text>Тут будут заявки... А пока они просто пишутся в консоль.</Text>
							{/* {this.props._curatorProjects.map((project, index) => {
								return (<Text key={index}>{`Project: ${project.projectUid}\nVacancy: ${project.vacancyUid}\nCandidateUid: ${project.candidateUid}\n\n\n`}</Text>);
							}) || 'Пусто'} */}
						</View>
					}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({auth, projects}) => {
	const {user, _token} = auth;
	const {_curatorProjects} = projects;

	return {user, _token, _curatorProjects};
};

export default connect(mapStateToProps, {
	_updateUserBio,
	updateUserBio,
	updateUserAchievements,
	updateUserHistory,
	projectCreate,
	getCandidates
})(ProjectCreateForm);
