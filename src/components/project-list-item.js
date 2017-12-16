import React, {Component} from 'react';
import {Animated, Easing} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	ListItem,
	Left,
	Body,
	Right,
	Text,
	Thumbnail,
	Button,
	Icon
} from 'native-base';
import _ from 'lodash';
import {THUMBNAIL_BORDER_COLOR} from './styles/colors';
import styles from './styles/projects-list-styles';

class ProjectListItem extends Component {
	state = {
		opacityAnimation: new Animated.Value(0)
	}

	handleRowPress = () => {
		Actions.projectInfo({currentProject: this.props.project});
	}

	componentDidMount() {
		Animated.timing(
			this.state.opacityAnimation,
			{
				toValue: 1,
				duration: 550,
				easing: Easing.ease,
				useNativeDriver: true
			}
		).start();
	}

	render() {
		const {name, description, photoBase64, keywords, maxMembers, uid} = this.props.project;
		const vacancies = _.map(this.props.project.vacancies, (value, key) => ({key, value}));
		const members = _.map(this.props.project.members, (value, key) => ({key, value}));
		const {projectListItem} = styles;

		return (
			<Animated.View
				style={{opacity: this.state.opacityAnimation}}
			>
				<ListItem noBorder avatar style={projectListItem} onPress={this.handleRowPress}>
					<Left>
						<Thumbnail
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
						<Text note>{description}</Text>
					</Body>
					<Right style={{borderBottomWidth: 0}}>
						<Button small transparent>
							<Text note>{`${vacancies.filter(vacancy => vacancy.value.employedBy !== '').length}/${vacancies.filter(vacancy => vacancy.value.employedBy === '').length} `}<Icon style={{fontSize: 14}} name="md-person"/></Text>
						</Button>
					</Right>
				</ListItem>
			</Animated.View>
		);
	}
}

export default ProjectListItem;
