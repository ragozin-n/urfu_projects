import React, {Component} from 'react';
import {ListItem, Right, Left, Button, Icon, Text, Thumbnail, Body} from 'native-base';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {THUMBNAIL_BORDER_COLOR} from '../styles/colors';

class MemberListItem extends Component {
	state = {
		user: {}
	}

	componentWillMount() {
		if (_.isEmpty(this.state.user)) {
			firebase.database().ref(`/users/${this.props.uid}`).once('value', bio => {
				this.setState({user: bio.val()});
			});
		}
	}

	render() {
		const {photoBase64, name} = this.state.user;

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
				<Body>
					<Text>{name}</Text>
				</Body>
				<Right/>
			</ListItem>
		);
	}
}

export default connect(null, {})(MemberListItem);
