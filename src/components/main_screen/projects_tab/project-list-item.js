import React, {PureComponent} from 'react';
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
import {PROJECTS_LIST_ITEM_BACKGROUND_COLOR} from '../../styles';
import styles from './styles';

class ProjectListItem extends PureComponent {
	state = {
		opacityAnimation: new Animated.Value(0),
		isCandidate: false,
		isCurator: false
	}

	handleRowPress = () => {
		const {isCurator, uid, project} = this.props;

		Actions.projectInfo({currentProject: project, isCurator, uid});
	}

	componentDidMount() {
		const {opacityAnimation} = this.state;

		this.isCurator();
		this.isCandidate();

		Animated.timing(
			opacityAnimation,
			{
				toValue: 1,
				duration: 550,
				easing: Easing.ease,
				useNativeDriver: true
			}
		).start();
	}

	isCandidate = () => {
		const {uid, project} = this.props;
		const vacancies = _.map(project.vacancies, (value, key) => ({key, value}));

		vacancies.forEach(vacancy => {
			if (uid === vacancy.value.employedBy) {
				this.setState({isAlreadyInProject: true});
			}
			const candidates = _.map(vacancy.value.candidates, (value, key) => ({key, value}));

			candidates.forEach(candidate => {
				if (uid === candidate.key) {
					this.setState({isCandidate: true});
				}
			});
		});
	}

	isCurator = () => {
		const {uid, project} = this.props;
		const {createdBy} = project;

		if (uid === createdBy) {
			this.setState({isCurator: true});
		}
	}

	render() {
		const {project} = this.props;
		const {name, description, photoBase64} = project;
		const vacancies = _.map(project.vacancies, (value, key) => ({key, value}));
		const {
			projectListItem,
			listItemImageStyle,
			listItemBorderFix,
			listItemAnnotationTextStyle
		} = styles;
		const {isCurator, isCandidate, isAlreadyInProject, opacityAnimation} = this.state;

		return (
			<Animated.View
				style={{opacity: opacityAnimation}}
			>
				<ListItem noBorder avatar style={[projectListItem, {backgroundColor: isCurator || isCandidate || isAlreadyInProject ? '#f5f0ec' : PROJECTS_LIST_ITEM_BACKGROUND_COLOR}]} onPress={this.handleRowPress}>
					<Left>
						<Thumbnail
							source={{uri: photoBase64}}
							style={listItemImageStyle}
						/>
					</Left>
					<Body style={listItemBorderFix}>
						<Text>
							{name}
						</Text>
						<Text note>
							{description}
						</Text>
						{
							(isCurator || isAlreadyInProject) &&
							<Text note style={listItemAnnotationTextStyle}>
								{'Ваш проект'}
							</Text>
						}
					</Body>
					<Right style={listItemBorderFix}>
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
