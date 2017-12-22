import React, {Component} from 'react';
import {
	ListItem,
	Right,
	Left,
	Text,
	Thumbnail,
	Body
} from 'native-base';
import firebase from 'firebase';
import {THUMBNAIL_BORDER_COLOR} from '../../../styles';

class MemberListItem extends Component {
	state = {
		user: {}
	}

	componentWillMount() {
		// Подгружаем действующего члена проекта
		if (_.isEmpty(this.state.user)) {
			firebase
				.database()
				.ref(`/users/${this.props.uid}`)
				.once('value', bio => {
					this.setState({user: bio.val()});
				});
		}
	}

	render() {
		const {photoBase64, name, phoneNumber} = this.state.user;

		return (
			<ListItem noBorder avatar>
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
					<Text>{name}</Text>
					<Text note>{phoneNumber}</Text>
				</Body>
				<Right style={{borderBottomWidth: 0}}/>
			</ListItem>
		);
	}
}

export default MemberListItem;
