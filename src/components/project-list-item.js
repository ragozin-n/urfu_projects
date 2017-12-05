import React, {Component} from 'react';
import {Alert, Modal, List, FlatList, View} from 'react-native';
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

	state = {
		modalVisible: false
	}

	handleRowPress = () => {
		this.setState({modalVisible: true});
	}

	handleApplyAction = (description, skills, projectUid, vacancyUid) => {
		Alert.alert(
			`${description}`,
			`${skills} ЗДЕСЬ БУДЕТ ТИПО ДОСТУПНОСТЬ И ВОЗМОЖНОСТЬ ДОБАВЛЕНИЯ`,
			[{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{text: 'Apply', onPress: () => this.props.applyToProject({projectUid, vacancyUid})}],
			{cancelable: true}
		);
	}

	renderRow(vacancy, uid) {
		const {name, description, skills} = vacancy.value;
		const {key} = vacancy;
		return (
			<ListItem onPress={() => this.handleApplyAction(description, skills, uid, key)}>
				<Text>{name}</Text>
			</ListItem>
		);
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

				<Modal
					animationType="fade"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => alert('Hardware close request.')}
				>
					<Content>
						<Card>
							<CardItem header>
								<Text>{name}</Text>
							</CardItem>
							<CardItem>
								<Body>
									<Text>Description: {description}</Text>
									<Text>Keywords: {keywords}</Text>
									<Text>Vacancies:</Text>
									<FlatList
										style={{flex: 1}}
										data={vacancies}
										renderItem={({item}) => this.renderRow(item, uid)}
										keyExtractor={(item) => item.key}
									/>
								</Body>
							</CardItem>
							<CardItem footer>
								<Button
									warning
									onPress={() => {
										this.setState({modalVisible: false});
									}}
								>
									<Text>Hide</Text>
								</Button>
							</CardItem>
						</Card>
					</Content>
				</Modal>
			</ListItem>
		);
	}
}

export default ProjectListItem;
