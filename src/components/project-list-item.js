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

	render() {
		const {name, description} = this.props.project;
		const {projectListItem} = styles;

		return (
			<ListItem avatar style={projectListItem} onPress={this.handleRowPress}>
				<Left>
					<Thumbnail
						large
						source={require('../images/face.jpg')}
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
						<Text note>Apply</Text>
					</Button>
				</Right>

				<Modal
					animationType="fade"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => { alert("Modal has been closed.") }}
				>
					<View style={{ marginTop: 400, paddingLeft: 30, paddingRight: 30 }}>
						<View>
							<H1>{name}</H1>
							<H3>{description}</H3>
							<H3>List of all users:</H3>
							<Text>Not implemented yet</Text>
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
