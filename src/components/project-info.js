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
	H3,
	Fab
} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {getCandidates} from '../actions/projects-actions';
import {THUMBNAIL_BORDER_COLOR} from './styles/colors';
import VacancyListItem from './common/vacancy-list-item';
import MemberListItem from './common/member-list-item';
import Counter from './common/counter';
import Divider from './common/divider';

class ProjectInfo extends Component {
	state = {
		isMembersVisible: false,
		curator: {},
		active: false
	}

	handleFabButton = () => {
		const {isCurator, uid, currentProject} = this.props;
		this.props.getCandidates({uid, isCurator, currentProject});
	}

	renderVacancy = (vacancy, uid) => {
		const {name, description, skills, candidates, employedBy} = vacancy.value;
		const {key} = vacancy;
		const currentUserUid = firebase.auth().currentUser.uid;
		const _candidates = _.map(candidates, (value, key) => ({key, value}));

		// Если вакансия занята, то рисуем фото
		if (employedBy) {
			return (
				<MemberListItem uid={employedBy}/>
			);
		}

		// Run throw candidates array and search current user id in it
		const isAlreadyApplied = _candidates.filter(item =>
			item.key === currentUserUid
		).length > 0;

		return (
			<VacancyListItem name={name} description={description} skills={skills} vacancyUid={key} projectUid={uid} isAlreadyApplied={isAlreadyApplied}/>
		);
	}

	componentWillMount() {
		// Download curator info
		if (_.isEmpty(this.state.curator)) {
			firebase.database().ref(`/users/${this.props.currentProject.createdBy}`).once('value', bio => {
				this.setState({curator: bio.val()});
			});
		}
	}

	render() {
		const {name, description, photoBase64, keywords, uid} = this.props.currentProject;
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));

		return (
			<Container style={{flex: 1}}>
				<Image
					resizeMode="cover"
					source={{uri: photoBase64}}
				>
					<Header noShadow style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent', marginBottom: 100, elevation: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomWidth: 0}}>
						<Left>
							<Button small transparent onPress={() => Actions.main()}>
								<Icon style={{color: 'white'}} name="arrow-back"/>
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
					<Button style={{marginTop: 5, marginBottom: 5}} small full transparent onPress={() => this.setState({isMembersVisible: !this.state.isMembersVisible})}>
						<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between'}}>
							<View style={{flex: 1, flexDirection: 'row', alignSelf: 'baseline'}}>
								<Counter
									many={vacancies.filter(vacancy => vacancy.value.employedBy !== '').length}
									of={vacancies.filter(vacancy => vacancy.value.employedBy === '').length}
								/>
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
					<View style={{flex: 1, flexDirection: 'row', margin: 15, alignItems: 'center'}}>
						<Thumbnail
							small
							source={{uri: this.state.curator.photoBase64}}
							style={{
								borderColor: THUMBNAIL_BORDER_COLOR,
								borderWidth: 2,
								overlayColor: 'white'
							}}
						/>
						<View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10}}>
							<Text>{this.state.curator.name}</Text>
							<Text style={{color: 'grey'}}>Куратор</Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', paddingLeft: 15}}>
						{
							keywords.split(', ').map((keyword, index) => {
								return (
									<Button key={index} style={{margin: 3}} small danger>
										<Text style={{color: 'white'}}>{keyword}</Text>
									</Button>
								);
							})
						}
					</View>
				</Content>
				{this.props.uid === this.props.currentProject.createdBy &&
				<Fab
					active={this.state.active}
					direction="down"
					containerStyle={{flex: 1, top: 160}}
					style={{ backgroundColor: 'red'}}
					position="topRight"
					onPress={() => this.setState({active: !this.state.active})}
				>
					<Icon name="md-more"/>
					<Button style={{backgroundColor: '#34A34F'}} onPress={() => this.handleFabButton()}>
						<Icon name="mail"/>
					</Button>
				</Fab>}
			</Container>);
	}
}

export default connect(null, {getCandidates})(ProjectInfo);
