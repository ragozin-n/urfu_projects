import React, {Component} from 'react';
import {
	Header,
	Item,
	Icon,
	Input,
	Button,
	Left,
	Title,
	Right
} from 'native-base';
import _ from 'lodash';
import {connect} from 'react-redux';
import styles from '../styles/search-header-styles';
import {SEARCH_INPUT_COLOR, ICON_ACTIVE_COLOR} from '../styles/colors';
import {projectsFilter} from '../../actions';

class SearchHeader extends Component {
	state = {
		isHeaderSearch: false
	};

	handleSearch = text => {
		this.props.projectsFilter(text, this.props._projects);
	};

	render() {
		const {titleStyle, iconStyle} = styles;

		if (this.state.isHeaderSearch) {
			return (
				<Header hasTabs searchBar style={{backgroundColor: 'transparent'}}>
					<Item style={{backgroundColor: 'transparent'}}>
						<Icon style={iconStyle} name="md-search"/>
						<Input
							style={{color: SEARCH_INPUT_COLOR}}
							placeholderTextColor={ICON_ACTIVE_COLOR}
							placeholder="Поиск..."
							onChangeText={text => this.handleSearch(text)}
						/>
						<Button transparent small onPress={() => this.setState({isHeaderSearch: false})}>
							<Icon style={iconStyle} name="md-close"/>
						</Button>
					</Item>
				</Header>);
		}

		return (
			<Header hasTabs style={{backgroundColor: 'transparent'}}>
				<Left>
					<Title style={titleStyle}>Все проекты</Title>
				</Left>
				<Right>
					<Button transparent small onPress={() => this.setState({isHeaderSearch: true})}>
						<Icon style={iconStyle} name="md-search"/>
					</Button>
				</Right>
			</Header>);
	}
}

const mapStateToProps = state => {
	const _projects = _.map(state.projects.data, (val, uid) => {
		return {...val, uid};
	});

	return {_projects};
};

export default connect(mapStateToProps, {projectsFilter})(SearchHeader);
