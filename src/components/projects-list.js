import React, {Component} from 'react';
import {FlatList, Platform} from 'react-native';
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
	Button
} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {projectsFetch} from '../actions';
import ProjectListItem from './project-list-item';

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
		const {containerStyle, headerStyle, iconStyle} = styles;

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
					<FlatList
						data={this.props.projects}
						renderItem={({item}) => this.renderRow(item)}
						keyExtractor={item => item.uid}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = {
	headerStyle: {
		backgroundColor: 'rgba(231, 29, 54, 1)'
	},
	containerStyle: {
		backgroundColor: 'rgba(253, 255, 252, 1)'
	},
	iconStyle: {
		color: (Platform.OS === 'android') ? 'white' : 'black'
	}
};

const mapStateToProps = state => {
	const projects = _.map(state.projects, (val, uid) => {
		return {...val, uid};
	});
	return {projects};
};

export default connect(mapStateToProps, {projectsFetch})(ProjectsList);
