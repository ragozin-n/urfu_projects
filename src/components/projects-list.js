import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container,
	Content,
	Icon,
	Tabs,
	Tab,
	TabHeading
} from 'native-base';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch} from '../actions';
import SearchHeader from './common/search-header';
import {LOGIN_GRADIENT_COLORS} from './styles/colors';
import ProjectListItem from './project-list-item';
import styles from './styles/projects-list-styles';

class ProjectsList extends Component {
	state = {
		isHeaderSearch: false
	}

	handleAddProjectEvent = () => {
		Actions.createProject();
	}

	renderRow(project) {
		return <ProjectListItem project={project}/>;
	}

	componentWillMount() {
		this.props.projectsFetch();
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState.isHeaderSearch !== this.state.isHeaderSearch || nextProps !== this.props;
	}

	render() {
		console.log('render');
		const {
			containerStyle,
			iconStyle,
			tabBarUnderlineStyle
		} = styles;

		return (
			<Container style={containerStyle}>
				<LinearGradient style={{flex: 1}} colors={LOGIN_GRADIENT_COLORS}>
					<SearchHeader/>
					<Content scrollEnabled={false} style={{backgroundColor: 'transparent'}}>
						<Tabs tabBarUnderlineStyle={tabBarUnderlineStyle} initialPage={0}>
							<Tab
								heading={
									<TabHeading style={{backgroundColor: 'transparent'}}>
										<Icon style={iconStyle} name="md-git-network"/>
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
										<Icon style={iconStyle} name="md-person"/>
									</TabHeading>}
							/>
							<Tab
								heading={
									<TabHeading style={{backgroundColor: 'transparent'}}>
										<Icon style={iconStyle} name="md-settings"/>
									</TabHeading>}
							/>
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
