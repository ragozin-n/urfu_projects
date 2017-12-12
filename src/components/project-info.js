import React, {Component} from 'react';
import {View, Platform, FlatList} from 'react-native';
import firebase from 'firebase';
import {
	Container,
	Content,
	Header,
	Text,
	Body,
	Button,
	Left,
	Icon,
	Title,
	Right,
	Thumbnail,
	H2,
	H3
} from 'native-base';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import VacancyListItem from './common/vacancy-list-item';
import {THUMBNAIL_BORDER_COLOR, PROJECTS_LIST_GRADIENT_COLORS} from './styles/colors';

class ProjectInfo extends Component {
	state = {
		isMembersVisible: false,
		isVacancyVisible: false
	}

	renderVacancy = (vacancy, uid) => {
		const {name, description, skills, candidates} = vacancy.value;
		const {key} = vacancy;
		const currentUserUid = firebase.auth().currentUser.uid;
		const _candidates = _.map(candidates, (value, key) => ({key, value}));

		// Run throw candidates array and search current user id in it
		const isAlreadyApplied = _candidates.filter(item =>
			item.key === currentUserUid
		).length > 0;

		return (
			<VacancyListItem name={name} description={description} skills={skills} vacancyUid={key} projectUid={uid} isAlreadyApplied={isAlreadyApplied}/>
		);
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.currentProject;
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));
		const members = _.map(this.props.currentProject.members, (value, key) => ({key, value}));

		return (
			<Container style={{flex: 1}}>
				<LinearGradient
					style={{flex: 1}}
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent'}}>
						<Left>
							<Button small transparent onPress={() => Actions.main()}>
								<Icon name="arrow-back"/>
							</Button>
						</Left>
						<Body>
							<Title>
								Подробнее
							</Title>
						</Body>
						<Right/>
					</Header>
				<Content style={{backgroundColor: 'white', padding: 15}}>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
						<Thumbnail
							style={{
								borderColor: THUMBNAIL_BORDER_COLOR,
								borderWidth: 2,
								marginRight: 35,
								overlayColor: 'white'
							}}
							large
							source={{uri: photoBase64}}
						/>
						<H2>{name}</H2>
					</View>

					<Button small full transparent onPress={() => this.setState({isMembersVisible: !this.state.isMembersVisible})}>
						<Text>Участники проекта: {members.length}/{maxMembers} <Icon style={{fontSize: 15}} name={this.state.isMembersVisible ? 'arrow-up' : 'arrow-down'}/></Text>
					</Button>
					{this.state.isMembersVisible &&
						<Text>Вместо участников пока ключевые слова: {keywords}</Text>
					}

					<Button small full transparent onPress={() => this.setState({isVacancyVisible: !this.state.isVacancyVisible})}>
						<Text>Вакансии: <Icon style={{fontSize: 15}} name={this.state.isVacancyVisible ? 'arrow-up' : 'arrow-down'}/></Text>
					</Button>
					{this.state.isVacancyVisible &&
						<FlatList
							style={{flex: 1}}
							data={vacancies}
							renderItem={({item}) => this.renderVacancy(item, uid)}
							keyExtractor={item => item.key}
						/>
					}

					<H3>Описание:</H3>
					<Text>{description}</Text>
					<View style={{flex: 1}}/>

					{/* <LinearGradient
						colors={PROJECTS_LIST_GRADIENT_COLORS}
						style={{flex: 1}}
					>
						<Button full transparent>
							<Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Отправить заявку</Text>
						</Button>
					</LinearGradient> */}
				</Content>
				</LinearGradient>
			</Container>);
	}
}

export default connect(null, {})(ProjectInfo);
