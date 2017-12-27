import React, {Component} from 'react';
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

class ProfileForm extends Component {
	render() {
		const {isCurator, name, photoBase64, skills, phoneNumber} = this.props.user;
		const {email} = this.props._token;
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
						<H2>{name}</H2>
						<Text note>{isCurator ? 'Куратор' : 'Студент'}</Text>
					</View>
					<Card>
						<CardItem header>
							<Text>Контакты:</Text>
						</CardItem>
						<CardItem>
							<Icon active name="call"/>
							<Text note>{phoneNumber}</Text>
						</CardItem>
						<CardItem>
							<Icon active name="mail"/>
							<Text note>{email}</Text>
						</CardItem>
					</Card>
					<View style={skillsViewStyle}>
						{
							skills.split(', ').map((skill, index) => {
								return (
									<Button key={index} style={skillsItemStyle} small danger>
										<Text style={skillsItemTextStyle}>{skill}</Text>
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
