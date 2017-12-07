import React, {Component} from 'react';
import {View} from 'react-native';
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
		isMembersVisible: false
	}

	renderRow = (vacancy, uid) => {
		const {name, description, skills} = vacancy.value;
		const {key} = vacancy;

		return (
			<ListItem onPress={() => this.handleApplyAction(description, skills, uid, key)}>
				<Text>{name}</Text>
			</ListItem>
		);
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.currentProject;
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));
		const members = _.map(this.props.currentProject.members, (value, key) => ({key, value}));

		return (
			<Container>
				<Header>
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
				<Content>
					<Card>
						<CardItem style={{flex: 1, flexDirection: 'row'}}>
							<Thumbnail
								style={{
									borderColor: THUMBNAIL_BORDER_COLOR,
									borderWidth: 2,
									marginRight: 15
								}}
								large
								source={{uri: photoBase64}}
							/>
							<H2>{name}</H2>
						</CardItem>
						<CardItem style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
							<Button small full style={{flex: 1}} transparent onPress={() => this.setState({isMembersVisible: !this.state.isMembersVisible})}>
								<Text>Участники проекта: {members.length}/{maxMembers} <Icon style={{fontSize: 15}} name={this.state.isMembersVisible ? 'arrow-up' : 'arrow-down'}/></Text>									
							</Button>
							<View style={{flex: 1}}>
								{this.state.isMembersVisible && <Text>ТУПО БЛОК ТЕКСТА ПОКА: {keywords}</Text>}
							</View>
						</CardItem>
						<CardItem>
							<View style={{flex: 1, flexDirection: 'column'}}>
								<H3>Описание:</H3>
								<Text>{description}</Text>
							</View>
						</CardItem>
						<CardItem>
							<LinearGradient
								colors={PROJECTS_LIST_GRADIENT_COLORS}
								style={{flex: 1}}
							>
								<Button full transparent style={{flex: 1}}>
									<Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>Отправить заявку</Text>
								</Button>
							</LinearGradient>
						</CardItem>
					</Card>
				</Content>
			</Container>);
	}
}

export default connect(null, {})(ProjectInfo);
