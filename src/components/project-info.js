import React, {Component} from 'react';
import {View, Platform, FlatList, Alert} from 'react-native';
import VacancyListItem from './common/vacancy-list-item';
import {
	Container,
	Content,
	Header,
	Card,
	CardItem,
	Text,
	Body,
	Button,
	Left,
	Icon,
	Title,
	ListItem,
	Right,
	Thumbnail,
	H2,
	H3
} from 'native-base';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {THUMBNAIL_BORDER_COLOR, PROJECTS_LIST_GRADIENT_COLORS} from './styles/colors';

class ProjectInfo extends Component {
	state = {
		isMembersVisible: false,
		isVacancyVisible: false
	}

	renderVacancy = (vacancy, uid) => {
		const {name, description, skills} = vacancy.value;
		const {key} = vacancy;

		return (
			<VacancyListItem name={name} description={description} skills={skills} uid={key}/>
		);
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.currentProject;
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));
		const members = _.map(this.props.currentProject.members, (value, key) => ({key, value}));

		return (
			<Container>
				<Header style={{marginTop: (Platform.OS === 'android') ? 15 : 0}}>
					<Left>
						<Button small transparent onPress={() => Actions.main()}>
							<Icon name="arrow-back"/>
						</Button>
					</Left>
					<Body>
						<Title>
							БЛАБЛАБЛА
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

					<LinearGradient
						colors={PROJECTS_LIST_GRADIENT_COLORS}
						style={{flex: 1}}
					>
						<Button full transparent>
							<Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Отправить заявку</Text>
						</Button>
					</LinearGradient>
				</Content>
			</Container>);
	}
}

export default connect(null, {})(ProjectInfo);
