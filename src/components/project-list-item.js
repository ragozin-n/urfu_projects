import React, {Component} from 'react';
import {Alert, Modal, View} from 'react-native';
import {
	ListItem,
	Left,
	Body,
	Right,
	Text,
	Thumbnail,
	Button,
	H1,
	H3
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

	handleApplyAction = (name, description) => {
		Alert.alert(
			`${name}`,
			`${description}`,
			[],
			{cancelable: true}
		);
	}

	renderVacancies = vacancies => {
		const _vacancies = [];
		const _text = [];
		_.forEach(vacancies, value => _vacancies.push(value));
		for (let i = 0; i < _vacancies.length && i < 5; i++) {
			const {name, description, skills} = _vacancies[i];
			_text.push(<Text key={i}>{name}:{skills}</Text>);
		}
		return _text;
	}

	render() {
		const {name, description, photoBase64, keywords, membersCount, vacancies} = this.props.project;
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
					<Button small transparent onPress={() => this.handleApplyAction(name, description)}>
						<Text note>{membersCount}</Text>
					</Button>
				</Right>

				<Modal
					animationType="fade"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => alert('Hardware close request.')}
				>
					<View style={{marginTop: 20, paddingLeft: 30, paddingRight: 30}}>
						<View>
							<H1>{name}</H1>
							<H3>{description}</H3>
							<H3>Keywords:</H3>
							<Text>{keywords}</Text>
							<H3>First five vacancies:</H3>
							{this.renderVacancies(vacancies)}
							<Button
								warning
								block
								onPress={() => {
									this.setState({modalVisible: false});
								}}
							>
								<Text>Hide</Text>
							</Button>

						</View>
					</View>
				</Modal>
			</ListItem>
		);
	}
}

export default ProjectListItem;
