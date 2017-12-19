import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {Container, Content, H2, Thumbnail, Text} from 'native-base';
import {THUMBNAIL_BORDER_COLOR} from '../../styles';

class ProfileForm extends Component {
	render() {
		const {isCurator, name, photoBase64} = this.props.user;
		const {uid, email} = this.props._token;
		const myProjects = _.map(this.props.user.myProjects, (value, key) => ({key, value}));

		return (
			<Container>
				<Content style={{backgroundColor: 'white', padding: 15}}>
					<View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
						<Thumbnail
							style={{
								borderColor: THUMBNAIL_BORDER_COLOR,
								borderWidth: 2,
								marginRight: 35,
								overlayColor: 'white'
							}}
							large
							source={{uri: photoBase64}}
						/>
						<H2>{name}</H2>
					</View>
					<Text>Я {isCurator ? 'куратор' : 'обычный студент'}</Text>
					<Text>Мой email: {email}, уникальный идентификатор {uid}</Text>
					{
						myProjects.map(project => {
							const projectUid = project.key;
							const vacanciesUids = _.map(project.value, (value, key) => ({key, value}));
							return vacanciesUids.map(vacancy => {
								return (
									<Text key={vacancy.key}>
										{`\nProject:${projectUid}\nVacancy:${vacancy.key}`}
									</Text>
								);
							});
						})
					}
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
