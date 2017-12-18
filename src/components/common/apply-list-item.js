import React, {Component} from 'react';
import Divider from '../common/divider';
import {ListItem, Right, Left, Button, Icon, Text, Thumbnail, Body, Toast} from 'native-base';
import {hireStudentToProject, _updateProject} from '../../actions/projects-actions';
import {Actions} from 'react-native-router-flux';
import {View} from 'react-native';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {THUMBNAIL_BORDER_COLOR} from '../styles/colors';

class ApplyListItem extends Component {
	state = {
		user: {},
		isFullView: false
	}

	componentWillMount() {
		if (_.isEmpty(this.state.user)) {
			firebase.database().ref(`/users/${this.props.item.candidate.key}`).once('value', bio => {
				this.setState({user: bio.val()});
			});
		}
	}

	handleApplyToVacancy = ({project, vacancy}) => {
		try {
			this.props.hireStudentToProject({
				projectUid: project.key,
				vacancyUid: vacancy.key,
				studentUid: this.props.item.candidate.key
			});
		} catch (err) {
			debugger;
			Toast.show({
				text: err.message,
				position: 'bottom',
				buttonText: 'Okay'
			});
		}
		Actions.main();
	}

	render() {
		const {photoBase64, name, skills} = this.state.user;
		const {project, vacancy} = this.props.item;

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
					<Text note>{`${vacancy.value.name} в ${project.value.name}`}</Text>
					{this.state.isFullView &&
						<View style={{marginTop: 10}}>
							<Text note>{`Требования проекта: ${project.value.keywords}`}</Text>
							<Text note>{`Требования вакансии: ${vacancy.value.skills}`}</Text>
							<Text note>{`Умения ${name}: ${skills}`}</Text>
							<Button success full onPress={() => this.handleApplyToVacancy({project, vacancy})}>
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
