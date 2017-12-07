import React, {Component} from 'react';
import {Alert, Modal, List, FlatList, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	ListItem,
	Left,
	Body,
	Right,
	Text,
	Thumbnail,
	Button,
	Card,
	CardItem,
	Content
} from 'native-base';
import _ from 'lodash';
import {THUMBNAIL_BORDER_COLOR} from './styles/colors';
import styles from './styles/projects-list-styles';

class ProjectListItem extends Component {

	handleApplyAction = (description, skills, projectUid, vacancyUid) => {
		Alert.alert(
			`${description}`,
			`${skills} ЗДЕСЬ БУДЕТ ТИПО ДОСТУПНОСТЬ И ВОЗМОЖНОСТЬ ДОБАВЛЕНИЯ`,
			[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Apply', onPress: () => this.props.applyToProject({projectUid, vacancyUid})}],
			{cancelable: true}
		);
	}

	handleRowPress = () => {
		Actions.projectInfo({currentProject: this.props.project});
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.project;
		const vacancies = _.map(this.props.project.vacancies, (value, key) => ({key, value}));
		const {projectListItem} = styles;
		return (
			<ListItem avatar style={projectListItem} onPress={this.handleRowPress}>
				<Left>
					<Thumbnail
						source={{uri: photoBase64}}
						style={{
							borderColor: THUMBNAIL_BORDER_COLOR,
							borderWidth: 2
						}}
					/>
				</Left>
				<Body>
					<Text>{name}</Text>
					<Text note>{description}</Text>
				</Body>
				{/* Fix for https://github.com/GeekyAnts/NativeBase/issues/672 */}
				<Right>
					<Button small transparent>
						<Text note>{maxMembers}</Text>
					</Button>
				</Right>
			</ListItem>
		);
	}
}

export default ProjectListItem;
