import React, {Component} from 'react';
import {View, Platform, FlatList, Image} from 'react-native';
import {
	Container,
	Content,
	Header,
	Text,
	Body,
	Button,
	Left,
	Icon,
	Title,
	Right
} from 'native-base';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {Actions} from 'react-native-router-flux';
import {PROJECTS_LIST_GRADIENT_COLORS} from '../../../styles';
import ApplyListItem from './apply-list-item';
import styles from './styles';

class AppliesForm extends Component {
	renderApply = (apply, currentProject) => {
		return (
			<ApplyListItem item={apply} currentProject={currentProject}/>
		);
	}

	handleBackAction = () => {
		const {currentProject, uid} = this.props;

		// Если мы в этой форме, то мы куратор. поэтому вернем true руками.
		Actions.projectInfo({currentProject, isCurator: true, uid});
	}

	render() {
		const {applies, currentProject} = this.props;
		const {
			headerStyle,
			iconStyle,
			titleStyle,
			headerBodyStyle,
			appliesListStyle,
			appliesEmptyView,
			appliesEmplyViewTextStyle,
			appliesEmplyViewImageStyle
		} = styles;

		return (
			<Container>
				<LinearGradient
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header noShadow style={[headerStyle, {marginTop: (Platform.OS === 'android') ? 15 : 0}]}>
						<Left>
							<Button small transparent onPress={this.handleBackAction}>
								<Icon style={iconStyle} name="arrow-back"/>
							</Button>
						</Left>
						<Body style={headerBodyStyle}>
							<Title style={titleStyle}>
								{'Заявки на участие'}
							</Title>
						</Body>
						<Right/>
					</Header>
				</LinearGradient>
				<Content>
					<FlatList
						style={appliesListStyle}
						data={applies}
						renderItem={({item}) => this.renderApply(item, currentProject)}
						keyExtractor={(item, index) => index}
					/>
					{!applies.length > 0 &&
						<View style={appliesEmptyView}>
							<Text style={appliesEmplyViewTextStyle}>
								{`На текущий момент заявок в проект \n${currentProject.name}\nнет.\n\nЗагляните сюда чуть позже.`}
							</Text>
							<Image
								style={appliesEmplyViewImageStyle}
								source={require('../../../../images/jdun.png')}
								resizeMode="contain"
							/>
						</View>
					}
				</Content>
			</Container>);
	}
}

export default AppliesForm;
