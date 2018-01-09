import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {
	Container,
	Content,
	H2,
	Thumbnail,
	Text,
	Card,
	CardItem,
	Icon,
	Button
} from 'native-base';
import styles from './styles';

class ProfileForm extends Component {
	static propTypes = {
		user: PropTypes.shape({
			isCurator: PropTypes.bool.isRequired,
			name: PropTypes.string.isRequired,
			photoBase64: PropTypes.string.isRequired,
			skills: PropTypes.string.isRequired,
			phoneNumber: PropTypes.string.isRequired
		}).isRequired,
		_token: PropTypes.shape({
			email: PropTypes.string.isRequired,
			uid: PropTypes.string.isRequired
		}).isRequired
	}

	render() {
		const {user, _token} = this.props;
		const {isCurator, name, photoBase64, skills, phoneNumber} = user;
		const {email} = _token;
		const {
			contentStyle,
			profileViewStyle,
			profileViewImageStyle,
			skillsViewStyle,
			skillsItemStyle,
			skillsItemTextStyle
		} = styles;

		return (
			<Container>
				<Content style={contentStyle}>
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
						<CardItem>
							<Icon active name="mail"/>
							<Text note>
								{email}
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
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {user, _token} = auth;

	return {user, _token};
};

export default connect(mapStateToProps, {})(ProfileForm);
