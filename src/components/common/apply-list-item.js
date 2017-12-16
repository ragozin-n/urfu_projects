import React, {Component} from 'react';
import {ListItem, Right, Left, Button, Icon, Text, Thumbnail, Body} from 'native-base';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {THUMBNAIL_BORDER_COLOR} from '../styles/colors';

class ApplyListItem extends Component {
	state = {
		user: {}
	}

	componentWillMount() {
		if (_.isEmpty(this.state.user)) {
			firebase.database().ref(`/users/${this.props.item.candidate.key}`).once('value', bio => {
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
				<Body style={{borderBottomWidth: 0}}>
					<Text>{name}</Text>
					<Text note>{`${this.props.item.project.value.name}|${this.props.item.vacancy.value.name}`}</Text>
				</Body>
				<Right style={{borderBottomWidth: 0}}/>
			</ListItem>
		);
	}
}

export default connect(null, {})(ApplyListItem);
