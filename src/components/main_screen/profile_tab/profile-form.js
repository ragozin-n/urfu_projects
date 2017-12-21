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
import {THUMBNAIL_BORDER_COLOR} from '../../styles';

class ProfileForm extends Component {
	render() {
		const {isCurator, name, photoBase64, skills, phoneNumber} = this.props.user;
		const {email} = this.props._token;

		return (
			<Container>
				<Content style={{backgroundColor: 'white', padding: 15}}>
					<View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
						<Thumbnail
							style={{
								borderColor: THUMBNAIL_BORDER_COLOR,
								borderWidth: 2,
								overlayColor: 'white',
								marginBottom: 15
							}}
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
					<View style={{flex: 1, flexDirection: 'row', alignContent: 'space-between', flexWrap: 'wrap', paddingLeft: 15}}>
						{
							skills.split(', ').map((skill, index) => {
								return (
									<Button key={index} style={{margin: 3}} small danger>
										<Text style={{color: 'white'}}>{skill}</Text>
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
