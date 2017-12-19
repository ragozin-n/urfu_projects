import React, {Component} from 'react';
import {
	ListItem,
	Right,
	Left,
	Button,
	Text,
	Thumbnail,
	Body
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {View} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {hireStudentToProject} from '../../../../actions/projects-actions';
import Divider from '../../../common/divider';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles/colors';

class ApplyListItem extends Component {
	state = {
		user: {},
		isFullView: false
	}

	componentWillMount() {
		// Подгрузим студента, который отправил заявку в проект
		if (_.isEmpty(this.state.user)) {
			firebase
				.database()
				.ref(`/users/${this.props.item.candidate.key}`)
				.once('value', bio => {
					this.setState({user: bio.val()});
				});
		}
	}

	handleApplyToVacancy = ({vacancy}) => {
		const {hireStudentToProject, currentProject, item} = this.props;

		hireStudentToProject({
			projectUid: currentProject.uid,
			vacancyUid: vacancy.uid,
			studentUid: item.candidate.key
		});
		Actions.main();
	}

	render() {
		const {photoBase64, name, skills} = this.state.user;
		const {vacancy} = this.props.item;
		const {currentProject} = this.props;

		return (
			<ListItem noBorder avatar style={{marginLeft: 0, paddingLeft: 15}} onPress={() => this.setState({isFullView: !this.state.isFullView})}>
				<Left style={{position: 'absolute', top: 15, left: 10}}>
					<Thumbnail
						small
						source={{uri: photoBase64}}
						style={{
							borderColor: THUMBNAIL_BORDER_COLOR,
							borderWidth: 2,
							overlayColor: 'white'
						}}
					/>
				</Left>
				<Body style={{borderBottomWidth: 0, marginLeft: 45}}>
					<Text>{name}</Text>
					<Text note>{`${vacancy.name} в ${currentProject.name}`}</Text>
					{this.state.isFullView &&
						<View style={{marginTop: 10}}>
							<Text note>{`Требования проекта: ${currentProject.keywords}`}</Text>
							<Text note>{`Требования вакансии: ${vacancy.skills}`}</Text>
							<Text note>{`Умения ${name}: ${skills}`}</Text>
							<Button success full onPress={() => this.handleApplyToVacancy({vacancy})}>
								<Text>Принять</Text>
							</Button>
							<Divider style={{marginTop: 10}}/>
						</View>
					}
				</Body>
				<Right style={{borderBottomWidth: 0}}/>
			</ListItem>
		);
	}
}

export default connect(null, {hireStudentToProject})(ApplyListItem);
