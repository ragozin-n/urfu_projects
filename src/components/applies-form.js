import React, {Component} from 'react';
import {View, Platform, FlatList} from 'react-native';
import firebase from 'firebase';
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
	Right,
	Thumbnail,
	H2,
	H3,
	Fab,
	ListItem
} from 'native-base';
import {connect} from 'react-redux';
import ApplyListItem from './common/apply-list-item';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import {LinearGradient} from 'expo';
import {PROJECTS_LIST_GRADIENT_COLORS} from './styles/colors';

class AppliesForm extends Component {
	renderApply = apply => {
		return (
			<ApplyListItem item={apply}/>
		);
	}

	render() {
		return (
			<Container style={{flex: 1}}>
				<LinearGradient
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header noShadow style={{marginTop: (Platform.OS === 'android') ? 15 : 0, backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0, shadowColor: 'transparent', borderBottomWidth: 0}}>
						<Left>
							<Button small transparent onPress={() => Actions.projectInfo({currentProject: this.props.currentProject, isCurator: this.props.isCurator, uid: this.props.uid})}>
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
						data={this.props.applies}
						renderItem={({item}) => this.renderApply(item)}
						keyExtractor={(item, index) => index}
					/>
				</Content>
			</Container>);
	}
}

export default connect(null, {})(AppliesForm);
