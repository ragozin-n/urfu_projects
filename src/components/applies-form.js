import React, {Component} from 'react';
import {View, Platform} from 'react-native';
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
import {LinearGradient} from 'expo';
import {PROJECTS_LIST_GRADIENT_COLORS} from './styles/colors';

class AppliesForm extends Component {

	render() {
		const vacancies = _.map(this.props.currentProject.vacancies, (value, key) => ({key, value}));
		return (
			<Container style={{flex: 1}}>
				<LinearGradient
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header noShadow style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomWidth: 0}}>
						<Left>
							<Button small transparent onPress={() => Actions.projectInfo({currentProject: this.props.currentProject})}>
								<Icon name="arrow-back"/>
							</Button>
						</Left>
						<Body style={{flex: 3}}>
							<Title>Заявки на участие</Title>
						</Body>
						<Right/>
					</Header>
				</LinearGradient>
				<Content/>

			</Container>);
	}
}

export default connect(null, {})(AppliesForm);
