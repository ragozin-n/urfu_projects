import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container,
	Header,
	Content,
	Left,
	Body,
	Right,
	Title,
	Icon,
	Button,
	Text,
	Tabs,
	Tab,
	TabHeading,
	Item,
	Input
} from 'native-base';
import {LinearGradient} from 'expo';
import {LOGIN_GRADIENT_COLORS} from './styles/colors'
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch} from '../actions';
import ProjectListItem from './project-list-item';
import styles from './styles/projects-list';
import { LOGIN_BUTTON_COLOR } from './styles/index';

class ProjectsList extends Component {

	// Handlers
	handleAddProjectEvent = () => {
		Actions.createProject();
	}

	renderRow(project) {
		return <ProjectListItem project={project}/>;
	}

	// Lifecycle methods
	componentWillMount() {
		this.props.projectsFetch();
	}

	render() {
		console.log('I render!');
		const {
			containerStyle,
			headerStyle,
			iconStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				// Направлениями start end управляем градиентом.
				<LinearGradient style={{flex: 1}} colors={LOGIN_GRADIENT_COLORS}>	
					<Header hasTabs searchBar style={{backgroundColor: 'transparent'}}>
						<Item style={{backgroundColor: 'transparent'}}>
							<Icon name="ios-search"/>
							<Input placeholder="Search"/>
							<Icon name="ios-people"/>
						</Item>
						<Button transparent>
							<Text>Search</Text>
						</Button>
					</Header>
					<Content scrollEnabled={false} style={{backgroundColor: 'transparent'}}>
						<Tabs initialPage={0}>
							<Tab heading={<TabHeading style={{ backgroundColor: 'transparent'}}><Text>Projects</Text></TabHeading>}>
								<FlatList
									style={{flex: 1}}
									data={this.props.projects}
									renderItem={({ item }) => this.renderRow(item)}
									keyExtractor={item => item.uid}
								/>
							</Tab>
							<Tab heading={<TabHeading style={{backgroundColor: 'transparent'}}><Text>Bio</Text></TabHeading>}/>
							<Tab heading={<TabHeading style={{backgroundColor: 'transparent'}}><Text>Settings</Text></TabHeading>}/>
						</Tabs>
					</Content>
				</LinearGradient>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	const projects = _.map(state.projects, (val, uid) => {
		return {...val, uid};
	});
	return {projects};
};

export default connect(mapStateToProps, {projectsFetch})(ProjectsList);
