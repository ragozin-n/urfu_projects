import React, {Component} from 'react';
import {View, Platform, FlatList, Image} from 'react-native';
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
import _ from 'lodash';
import {getCuratorBio} from '../actions/projects-actions';
import {Actions} from 'react-native-router-flux';
import VacancyListItem from './common/vacancy-list-item';
import Divider from './common/divider';

class ProjectInfo extends Component {
	state = {
		isMembersVisible: false,
		curator: {}
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

	componentWillMount() {
		console.log(_.isEmpty(this.state.curator));
		if (_.isEmpty(this.state.curator)) {
			firebase.database().ref(`/users/${uid}`).once('value')
				.then(bio => this.setState({curator: bio}));
		}
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.currentProject;
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));
		const members = _.map(this.props.currentProject.members, (value, key) => ({key, value}));
		console.log(this.state.curator);

		return (
			<Container style={{flex: 1}}>
				<Image
					resizeMode="cover"
					source={{uri: photoBase64}}
				>
					<Header style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent', marginBottom: 100}}>
						<Left>
							<Button small transparent onPress={() => Actions.main()}>
								<Icon name="arrow-back"/>
							</Button>
						</Left>
						<Body/>
						<Right/>
					</Header>
				</Image>
				<Content style={{backgroundColor: 'white', borderTopColor: 'red', borderTopWidth: 2}}>
					<View style={{flex: 1, flexDirection: 'row', alignSelf: 'flex-start', padding: 15}}>
						<H2>{name}</H2>
					</View>
					<Divider/>
					<Button small full transparent onPress={() => this.setState({isMembersVisible: !this.state.isMembersVisible})}>
						<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between'}}>
							<View style={{flex: 1, flexDirection: 'row', alignSelf: 'baseline'}}>
								<Text style={{color: 'black', textAlign: 'center'}}><Icon style={{fontSize: 18, color: 'black'}} name="md-people"/>  Участники: ({members.length}/{maxMembers})</Text>
							</View>
							<Icon style={{fontSize: 21, color: 'black'}} name={this.state.isMembersVisible ? 'md-arrow-dropup' : 'md-arrow-dropdown'}/>
						</View>
					</Button>
					{this.state.isMembersVisible &&
						<FlatList
							style={{flex: 1}}
							data={vacancies}
							renderItem={({item}) => this.renderVacancy(item, uid)}
							keyExtractor={item => item.key}
						/>
					}
					<Divider/>
					<View style={{padding: 15}}>
						<Text>{description}</Text>
					</View>
					<View style={{padding: 15}}>
						<Text>Тут будет куратор</Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', paddingLeft: 15}}>
						{
							keywords.split(', ').map((keyword, index) => {
								return (
									<Button style={{margin: 3}} key={index} small danger>
										<Text style={{color: 'white'}}>{keyword}</Text>
									</Button>
								);
							})
						}
					</View>
				</Content>
			</Container>);
	}
}

export default connect(null, {})(ProjectInfo);
