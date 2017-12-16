import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container,
	Tabs,
	Tab,
	TabHeading
} from 'native-base';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch, applyToProject} from '../actions';
import SearchHeader from './common/search-header';
import TabIcon from './common/tab-icon';
import {PROJECTS_LIST_GRADIENT_COLORS} from './styles/colors';
import ProjectListItem from './project-list-item';
import ProjectCreateForm from './project-create-form';
import styles from './styles/projects-list-styles';
import ProfileForm from './profile-form';

class ProjectsList extends Component {
	state = {
		activeTab: 0,
		initTab: 0
	}

	handleAddProjectEvent = () => {
		Actions.createProject();
	}

	renderRow(project) {
		const {isCurator, uid} = this.props;
		return <ProjectListItem project={project} applyToProject={this.props.applyToProject} isCurator={isCurator} uid={uid}/>;
	}

	componentDidMount() {
		const {isCurator, uid} = this.props;
		this.props.projectsFetch({isCurator, uid});
	}

	render() {
		const {
			containerStyle,
			tabBarUnderlineStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				<LinearGradient
					style={{flex: 1}}
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<SearchHeader/>
					<Tabs
						locked
						tabBarUnderlineStyle={tabBarUnderlineStyle}
						initialPage={this.state.initTab}
						onChangeTab={({i}) => this.setState({activeTab: i})}
						style={{shadowOpacity: 0, elevation: 0, shadowColor: 'transparent'}}
					>
						<Tab
							heading={
								<TabHeading style={{backgroundColor: 'transparent'}}>
									<TabIcon name="md-list" position={0} activeTab={this.state.activeTab}/>
								</TabHeading>}
						>
							<FlatList
								style={{flex: 1}}
								data={this.props.projects}
								renderItem={({item}) => this.renderRow(item)}
								keyExtractor={item => item.uid}
							/>
						</Tab>
						<Tab
							heading={
								<TabHeading style={{backgroundColor: 'transparent'}}>
									<TabIcon name="md-person" position={1} activeTab={this.state.activeTab}/>
								</TabHeading>}
						>
							<ProfileForm/>
						</Tab>
						<Tab
							heading={
								<TabHeading style={{backgroundColor: 'transparent'}}>
									<TabIcon name="md-settings" position={2} activeTab={this.state.activeTab}/>
								</TabHeading>}
						>
							<ProjectCreateForm/>
						</Tab>
					</Tabs>
				</LinearGradient>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	const projects = _.map(state.projects.filteredProjects, (val, uid) => {
		return {...val, uid};
	});

	const {isCurator} = state.auth.user;
	const {uid} = state.auth._token;

	return {projects, isCurator, uid};
};

export default connect(mapStateToProps, {projectsFetch, applyToProject})(ProjectsList);
