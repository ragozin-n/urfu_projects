import React, {Component} from 'react';
import {View, Platform, FlatList, ImageBackground} from 'react-native';
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
	Right,
	Thumbnail,
	H2,
	Fab
} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
// eslint-disable-next-line import/named
import {LinearGradient, Audio} from 'expo';
import {getCandidates} from '../../../../actions/projects-actions';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles';
import Counter from '../../../common/Counter/counter';
import Divider from '../../../common/Divider/divider';
import VacancyListItem from './vacancy-list-item';
import MemberListItem from './member-list-item';
import styles from './styles';

class ProjectInfo extends Component {
	state = {
		isMembersVisible: false,
		curator: {},
		active: false
	}

	handleDropDown = async () => {
		const {isMembersVisible} = this.state;

		try {
			await Audio.setIsEnabledAsync(true);
			await Expo.Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				shouldDuckAndroid: false,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
			});
			const sound = new Audio.Sound();
			if (isMembersVisible) {
				await sound.loadAsync(require('../../../../sounds/list-close.mp3'));
			} else {
				await sound.loadAsync(require('../../../../sounds/list-open.mp3'));
			}
			await sound.setVolumeAsync(0.8);
			await sound.playAsync();
		} catch (err) {
			console.log(err);
		}
		this.setState({isMembersVisible: !isMembersVisible});
	}

	handleGetCandidate = () => {
		const {isCurator, uid, currentProject, getCandidates} = this.props;

		getCandidates({uid, isCurator, currentProject});
	}

	handleProjectEdit = () => {
		const {currentProject} = this.props;

		Actions.editProject({project: currentProject});
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

		// Если вакансия находится на рассмотрении куратора,
		// мы должны написать другой текст в компоненте
		const isAlreadyApplied = _candidates.filter(item =>
			item.key === currentUserUid
		).length > 0;

		return (
			<VacancyListItem
				name={name}
				description={description}
				skills={skills}
				vacancyUid={key}
				projectUid={uid}
				isAlreadyApplied={isAlreadyApplied}
			/>
		);
	}

	componentWillMount() {
		const {curator} = this.state;
		const {currentProject} = this.props;

		// Подгружаем куратора проекта
		if (_.isEmpty(curator)) {
			firebase
				.database()
				.ref(`/users/${currentProject.createdBy}`)
				.once('value', bio => {
					this.setState({curator: bio.val()});
				});
		}
	}

	render() {
		const {currentProject, uid} = this.props;
		const {name, description, photoBase64, keywords} = currentProject;
		const vacancies = _.map(currentProject.vacancies, (value, key) => ({key, value}));
		const {
			headerStyle,
			headerBackIcon,
			contentStyle,
			projectInfoNameView,
			projectInfoFabButton,
			projectInfoCounterContainer,
			projectInfoDropDownIcon,
			projectInfoVacanciesList,
			projectInfpDescription,
			projectInfoCounterView
		} = styles;
		const {isMembersVisible, curator, active} = this.state;

		return (
			<Container>
				<ImageBackground
					style={{height: 180}}
					resizeMode="cover"
					source={{uri: photoBase64}}
				>
					<LinearGradient
						colors={['rgba(0,0,0, 0.2)', 'transparent']}
						start={[0, 0]}
						end={[0, 1]}
					>
						<Header noShadow style={[headerStyle, {marginTop: (Platform.OS === 'android') ? 15 : 0}]}>
							<Left>
								<Button small transparent onPress={() => Actions.main()}>
									<Icon style={headerBackIcon} name="arrow-back"/>
								</Button>
							</Left>
							<Body/>
							<Right/>
						</Header>
					</LinearGradient>
				</ImageBackground>
				<Content style={contentStyle}>
					<View style={projectInfoNameView}>
						<H2>
							{name}
						</H2>
					</View>
					<Divider/>
					<Button style={projectInfoFabButton} small full transparent onPress={this.handleDropDown}>
						<View style={projectInfoCounterContainer}>
							<View style={projectInfoCounterView}>
								<Counter
									many={vacancies.filter(vacancy => vacancy.value.employedBy !== '').length}
									of={vacancies.length}
								/>
							</View>
							<Icon style={projectInfoDropDownIcon} name={isMembersVisible ? 'md-arrow-dropup' : 'md-arrow-dropdown'}/>
						</View>
					</Button>
					{
						isMembersVisible &&
						<FlatList
							style={projectInfoVacanciesList}
							data={vacancies}
							renderItem={({item}) => this.renderVacancy(item, currentProject.uid)}
							keyExtractor={item => item.key}
						/>
					}
					<Divider/>
					<View style={projectInfpDescription}>
						<Text>
							{description}
						</Text>
					</View>
					<View style={{flex: 1, flexDirection: 'row', margin: 15, alignItems: 'center'}}>
						<Thumbnail
							small
							source={{uri: curator.photoBase64}}
							style={{
								borderColor: THUMBNAIL_BORDER_COLOR,
								borderWidth: 2,
								overlayColor: 'white'
							}}
						/>
						<View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginLeft: 10}}>
							<Text>
								{curator.name}
							</Text>
							<Text style={{color: 'grey'}}>
								{'Куратор'}
							</Text>
						</View>
					</View>
					<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', paddingLeft: 15}}>
						{
							keywords.split(', ').map((keyword, index) => {
								return (
									<Button key={index} style={{margin: 3}} small danger>
										<Text style={{color: 'white'}}>
											{keyword}
										</Text>
									</Button>
								);
							})
						}
					</View>
				</Content>

				{/* Кураторская кнопка */}
				{uid === currentProject.createdBy &&
					<Fab
						active={active}
						direction="down"
						containerStyle={{flex: 1, top: 145}}
						style={{backgroundColor: 'red'}}
						position="topRight"
						onPress={() => this.setState({active: !active})}
					>
						<Icon name="md-more"/>
						<Button style={{backgroundColor: '#34A34F'}} onPress={() => this.handleGetCandidate()}>
							<Icon name="mail"/>
						</Button>
						<Button style={{backgroundColor: '#34A34F'}} onPress={() => this.handleProjectEdit()}>
							<Icon name="md-create"/>
						</Button>
					</Fab>
				}
			</Container>);
	}
}

export default connect(null, {getCandidates})(ProjectInfo);
