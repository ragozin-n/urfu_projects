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
	Tab
} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch} from '../actions';
import ProjectListItem from './project-list-item';
import styles from './styles/projects-list';

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

	// shouldComponentUpdate(nextProps, nextState) {
	// 	// Тут мы боремся с ререндером при тапе на active tab
	// 	return this.state.selectedTab !== nextState.selectedTab || this.props !== nextProps;
	// }

	render() {
		console.log('I render!');
		const {
			containerStyle,
			headerStyle,
			iconStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				<Header style={headerStyle} hasTabs>
					<Left/>
					<Body>
						<Title>Projects</Title>
					</Body>
					<Right>
						<Button transparent onPress={this.handleAddProjectEvent}>
							<Icon name="cog" style={iconStyle}/>
						</Button>
					</Right>
				</Header>
				<Content>
					<Tabs initialPage={1}>
						<Tab heading="Tab1">
							<Text>Profile</Text>
							<Icon name="contact"/>
						</Tab>
						<Tab heading="Tab2">
							<FlatList
								data={this.props.projects}
								renderItem={({item}) => this.renderRow(item)}
								keyExtractor={item => item.uid}
							/>
						</Tab>
						<Tab heading="Tab3">
							<Text>Contact us</Text>
							<Icon name="send"/>
						</Tab>
					</Tabs>
				</Content>
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
