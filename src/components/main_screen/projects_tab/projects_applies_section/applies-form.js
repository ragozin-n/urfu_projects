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

class AppliesForm extends Component {
	renderApply = (apply, currentProject) => {
		return (
			<ApplyListItem item={apply} currentProject={currentProject}/>
		);
	}

	handleBackAction = () => {
		const {currentProject, uid} = this.props;
		// Здесь почему-то теряется поле isCurator.
		// Если мы в этой форме, то мы куратор. поэтому вернем true руками.
		Actions.projectInfo({currentProject, isCurator: true, uid});
	}

	render() {
		const {applies, currentProject} = this.props;

		return (
			<Container style={{flex: 1}}>
				<LinearGradient
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header noShadow style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomWidth: 0}}>
						<Left>
							<Button small transparent onPress={this.handleBackAction}>
								<Icon style={{color: 'white'}} name="arrow-back"/>
							</Button>
						</Left>
						<Body style={{flex: 3}}>
							<Title style={{color: 'white'}}>Заявки на участие</Title>
						</Body>
						<Right/>
					</Header>
				</LinearGradient>
				<Content>
					<FlatList
						style={{flex: 1}}
						data={applies}
						renderItem={({item}) => this.renderApply(item, currentProject)}
						keyExtractor={(item, index) => index}
					/>
					{!applies.length > 0 &&
						<View style={{flex: 1, alignItems: 'center', paddingTop: 50}}>
							<Text style={{textAlign: 'center', marginBottom: 30}}>{`На текущий момент заявок в проект \n${currentProject.name}\nнет.\n\nЗагляните сюда чуть позже.`}</Text>
							<Image
								style={{height: 400}}
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
