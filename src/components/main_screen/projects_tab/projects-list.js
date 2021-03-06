import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FlatList, Image} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container,
	Tabs,
	Tab,
	TabHeading,
	Fab,
	Icon
} from 'native-base';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {connect} from 'react-redux';
import {projectsFetch, applyToProject} from '../../../actions';
import SearchHeader from '../../common/SearchHeader/search-header';
import TabIcon from '../../common/TabIcon/tab-icon';
import {PROJECTS_LIST_GRADIENT_COLORS} from '../../styles';
import ProfileForm from '../profile_tab/profile-form';
import SettingsForm from '../settings_tab/settings-form';
import ProjectListItem from './project-list-item';
import styles from './styles';

class ProjectsList extends Component {
	static propTypes = {
		projects: PropTypes.arrayOf(
			PropTypes.shape({
				name: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				photoBase64: PropTypes.string.isRequired,
				keywords: PropTypes.string.isRequired
			})
		).isRequired,
		isCurator: PropTypes.bool.isRequired,
		uid: PropTypes.string.isRequired,
		applyToProject: PropTypes.func.isRequired,
		projectsFetch: PropTypes.func.isRequired
	}

	state = {
		activeTab: 0,
		initTab: 0
	}

	handleAddProjectEvent = () => {
		Actions.createProject();
	}

	renderRow(project) {
		const {isCurator, uid, applyToProject} = this.props;

		return (
			<ProjectListItem
				project={project}
				applyToProject={applyToProject}
				isCurator={isCurator}
				uid={uid}
			/>);
	}

	componentDidMount() {
		const {isCurator, uid, projectsFetch} = this.props;

		projectsFetch({isCurator, uid});
	}

	handleCuratorFab = () => {
		Actions.createProject();
	}

	render() {
		const {
			containerStyle,
			tabBarUnderlineStyle,
			gradientStyle,
			tabContainerStyle,
			tabHeadingStyle,
			backgroundImageStyle,
			fabStyle
		} = styles;
		const {isCurator, projects} = this.props;
		const {initTab, activeTab} = this.state;

		return (
			<Container style={containerStyle}>
				<LinearGradient
					style={gradientStyle}
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<SearchHeader/>
					<Tabs
						locked
						tabBarUnderlineStyle={tabBarUnderlineStyle}
						initialPage={initTab}
						onChangeTab={({i}) => this.setState({activeTab: i})}
						style={tabContainerStyle}
					>
						<Tab
							heading={
								<TabHeading style={tabHeadingStyle}>
									<TabIcon name="md-list" position={0} activeTab={activeTab}/>
								</TabHeading>}
						>
							{
								projects.length > 0 ?
									<FlatList
										style={{flex: 1}}
										data={projects}
										renderItem={({item}) => this.renderRow(item)}
										keyExtractor={item => item.uid}
									/> :
									<Image
										style={backgroundImageStyle}
										source={require('../../../images/empty.png')}
										resizeMode="center"
									/>
							}
							{/* Кураторская кнопка */}
							{isCurator &&
								<Fab
									containerStyle={{flex: 1}}
									style={fabStyle}
									position="bottomRight"
									onPress={this.handleCuratorFab}
								>
									<Icon name="md-add"/>
								</Fab>
							}
						</Tab>
						<Tab
							heading={
								<TabHeading style={tabHeadingStyle}>
									<TabIcon name="md-person" position={1} activeTab={activeTab}/>
								</TabHeading>}
						>
							<ProfileForm/>
						</Tab>
						<Tab
							heading={
								<TabHeading style={tabHeadingStyle}>
									<TabIcon name="md-settings" position={2} activeTab={activeTab}/>
								</TabHeading>}
						>
							<SettingsForm/>
						</Tab>
					</Tabs>
				</LinearGradient>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	const projects = state.projects.filteredProjects;

	const {isCurator} = state.auth.user;
	const {uid} = state.auth._token;

	return {projects, isCurator, uid};
};

export default connect(mapStateToProps, {projectsFetch, applyToProject})(ProjectsList);
