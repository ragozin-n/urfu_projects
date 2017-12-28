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
import Divider from '../../../common/Divider/divider';
import styles from './styles';

class ApplyListItem extends Component {
	state = {
		user: {},
		isFullView: false
	}

	componentWillMount() {
		const {user} = this.state;
		const {item} = this.props;

		// Подгрузим студента, который отправил заявку в проект
		if (_.isEmpty(user)) {
			firebase
				.database()
				.ref(`/users/${item.candidate.key}`)
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
		const {user, isFullView} = this.state;
		const {item} = this.props;
		const {photoBase64, name, skills} = user;
		const {vacancy} = item;
		const {currentProject} = this.props;
		const {
			appliesListItemStyle,
			appliesListItemImageStyle,
			appliesListItemLeftStyle,
			appliesListItemBodyStyle,
			appliestListItemFullViewStyle,
			appliesListItemDividerStyle,
			appliesListItemBorderFix
		} = styles;

		return (
			<ListItem noBorder avatar style={appliesListItemStyle} onPress={() => this.setState({isFullView: !isFullView})}>
				<Left style={appliesListItemLeftStyle}>
					<Thumbnail
						small
						source={{uri: photoBase64}}
						style={appliesListItemImageStyle}
					/>
				</Left>
				<Body style={appliesListItemBodyStyle}>
					<Text>
						{name}
					</Text>
					<Text note>
						{`${vacancy.name} в ${currentProject.name}`}
					</Text>
					{isFullView &&
						<View style={appliestListItemFullViewStyle}>
							<Text note>
								{`Требования проекта: ${currentProject.keywords}`}
							</Text>
							<Text note>
								{`Требования вакансии: ${vacancy.skills}`}
							</Text>
							<Text note>
								{`Умения ${name}: ${skills}`}
							</Text>
							<Button success full onPress={() => this.handleApplyToVacancy({vacancy})}>
								<Text>
									{'Принять'}
								</Text>
							</Button>
							<Divider style={appliesListItemDividerStyle}/>
						</View>
					}
				</Body>
				<Right style={appliesListItemBorderFix}/>
			</ListItem>
		);
	}
}

export default connect(null, {hireStudentToProject})(ApplyListItem);
