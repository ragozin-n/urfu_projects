import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	ListItem,
	Right,
	Left,
	Text,
	Thumbnail,
	Body,
	Button,
	Card,
	CardItem,
	Icon,
	H2
} from 'native-base';
import firebase from 'firebase';
import _ from 'lodash';
import {Modal, View} from 'react-native';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles';
import styles from './styles';

class MemberListItem extends Component {
	static propTypes = {
		uid: PropTypes.string.isRequired
	}

	state = {
		user: {},
		modalVisible: false
	}

	handleShowUserProfile = () => {
		this.setState({modalVisible: true});
	}

	componentWillMount() {
		const {user} = this.state;
		const {uid} = this.props;

		// Подгружаем действующего члена проекта
		if (_.isEmpty(user)) {
			firebase
				.database()
				.ref(`/users/${uid}`)
				.once('value', bio => {
					this.setState({user: bio.val()});
				});
		}
	}

	render() {
		const {user, modalVisible} = this.state;
		const {photoBase64, name, phoneNumber, isCurator, skills} = user;
		const {profileViewStyle, profileViewImageStyle, skillsViewStyle, skillsItemStyle, skillsItemTextStyle} = styles;

		return (
			<ListItem noBorder avatar onPress={this.handleShowUserProfile}>
				<Left>
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
				<Body style={{borderBottomWidth: 0}}>
					<Text>
						{name}
					</Text>
					<Text note>
						{phoneNumber}
					</Text>
				</Body>
				<Right style={{borderBottomWidth: 0}}/>

				{/* Modal section */}
				{ !_.isEmpty(user) &&
				<Modal
					animationType="slide"
					transparent
					visible={modalVisible}
					hardwareAccelerated
				>
					<View style={{flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
						<View style={{marginTop: 100, flex: 1}}>
							<View style={profileViewStyle}>
								<Thumbnail
									style={profileViewImageStyle}
									large
									source={{uri: photoBase64}}
								/>
								<H2>
									{name}
								</H2>
								<Text note>
									{isCurator ? 'Куратор' : 'Студент'}
								</Text>
							</View>
							<Card>
								<CardItem header>
									<Text>
										{'Контакты:'}
									</Text>
								</CardItem>
								<CardItem>
									<Icon active name="call"/>
									<Text note>
										{phoneNumber}
									</Text>
								</CardItem>
							</Card>
							<View style={skillsViewStyle}>
								{
									skills.split(', ').map((skill, index) => {
										return (
											<Button key={index} style={skillsItemStyle} small danger>
												<Text style={skillsItemTextStyle}>
													{skill}
												</Text>
											</Button>
										);
									})
								}
							</View>

							<Button
								full
								onPress={() => {
									this.setState({modalVisible: false});
								}}
							>
								<Text>
									{'Скрыть'}
								</Text>
							</Button>

						</View>
					</View>
				</Modal>
				}
			</ListItem>
		);
	}
}

export default MemberListItem;
