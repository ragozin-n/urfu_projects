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
	Button
} from 'native-base';
import _ from 'lodash';
import Counter from '../../common/Counter/counter';
import {THUMBNAIL_BORDER_COLOR, PROJECTS_LIST_ITEM_BACKGROUND_COLOR} from '../../styles';
import styles from './styles';

class ProjectListItem extends Component {
	state = {
		opacityAnimation: new Animated.Value(0)
	}

	handleRowPress = () => {
		const {isCurator, uid, project} = this.props;

		Actions.projectInfo({currentProject: project, isCurator, uid});
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
		const {name, description, photoBase64, createdBy} = this.props.project;
		const {uid} = this.props;
		const vacancies = _.map(this.props.project.vacancies, (value, key) => ({key, value}));
		const {projectListItem} = styles;

		return (
			<Animated.View
				style={{opacity: this.state.opacityAnimation}}
			>
				<ListItem noBorder avatar style={[projectListItem, {backgroundColor: createdBy === uid ? '#f5f0ec' : PROJECTS_LIST_ITEM_BACKGROUND_COLOR}]} onPress={this.handleRowPress}>
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
						{
							createdBy === uid &&
							<Text note style={{color: 'red'}}>{`Ваш проект`}</Text>
						}
					</Body>
					<Right style={{borderBottomWidth: 0}}>
						<Button small transparent>
							<Counter
								light
								many={vacancies.filter(vacancy => vacancy.value.employedBy !== '').length}
								of={vacancies.length}
							/>
						</Button>
					</Right>
				</ListItem>
			</Animated.View>
		);
	}
}

export default ProjectListItem;
