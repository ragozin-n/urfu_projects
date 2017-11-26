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
	Footer,
	FooterTab,
	Text
} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch} from '../actions';
import ProjectListItem from './project-list-item';
import styles from './styles/projects-list';

class ProjectsList extends Component {
	state = {
		selectedTab: 'projects'
	}

	// Handlers
	handleAddProjectEvent = () => {
		Actions.createProject();
	}

	renderRow(project) {
		return <ProjectListItem project={project}/>;
	}

	renderSelectedTab = () => {
		// Тут все красиво берется из папочки tabs, но пока так.
		switch (this.state.selectedTab) {
			case 'profile':
				return (<Text>Profile</Text>);
			case 'projects':
				return (
					<FlatList
						data={this.props.projects}
						renderItem={({item}) => this.renderRow(item)}
						keyExtractor={item => item.uid}
					/>
				);
			case 'contact_us':
				return (<Text>Contact us</Text>);
			default:
				return (<View/>);
		}
	}

	// Lifecycle methods
	componentWillMount() {
		this.props.projectsFetch();
	}

	shouldComponentUpdate(nextProps, nextState) {
		// Тут мы боремся с ререндером при тапе на active tab
		return this.state.selectedTab !== nextState.selectedTab || this.props !== nextProps;
	}

	render() {
		const {
			containerStyle,
			headerStyle,
			iconStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				<Header style={headerStyle}>
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
					{this.renderSelectedTab()}
				</Content>
				<Footer>
					{/* Можно тоже по сути выкинуть в отдельный компонент */}
					<FooterTab>
						<Button
							active={this.state.selectedTab === 'profile'}
							onPress={() => this.setState({selectedTab: 'profile'})}
						>
							<Text>Profile</Text>
							<Icon name="contact"/>
						</Button>
						<Button
							active={this.state.selectedTab === 'projects'}
							onPress={() => this.setState({selectedTab: 'projects'})}
						>
							<Text>Projects</Text>
							<Icon name="home"/>
						</Button>
						<Button
							active={this.state.selectedTab === 'contact_us'}
							onPress={() => this.setState({selectedTab: 'contact_us'})}
						>
							<Text>Contact us</Text>
							<Icon name="send"/>
						</Button>
					</FooterTab>
				</Footer>
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
