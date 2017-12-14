import React, {Component} from 'react';
import {
	Header,
	Body,
	Icon,
	Input,
	Button,
	Left,
	Title,
	Right,
	Item
} from 'native-base';
import _ from 'lodash';
import {Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import styles from '../styles/search-header-styles';
import {SEARCH_INPUT_COLOR, ICON_ACTIVE_COLOR} from '../styles/colors';
import {projectsFilter} from '../../actions';

class SearchHeader extends Component {
	state = {
		isHeaderSearch: false,
		slideAnimation: new Animated.Value(-10),
		opacityAnimation: new Animated.Value(0)
	};

	handleSearch = text => {
		this.props.projectsFilter(text, this.props._projects);
	};

	handleSearchIcon = () => {
		Animated.parallel([
			Animated.timing(
				this.state.slideAnimation,
				{
					toValue: 0,
					duration: 450,
					easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
					useNativeDriver: true
				}
			),
			Animated.timing(
				this.state.opacityAnimation,
				{
					toValue: 1,
					duration: 550,
					easing: Easing.ease,
					useNativeDriver: true
				}
			)
		]).start();
		this.setState({isHeaderSearch: !this.state.isHeaderSearch});
	};

	handleCloseIcon = () => {
		this.setState(
			{
				slideAnimation: new Animated.Value(-10),
				isHeaderSearch: !this.state.isHeaderSearch,
				opacityAnimation: new Animated.Value(0)
			});
		// Display all projects
		this.props.projectsFilter('', this.props._projects);
	};

	render() {
		const {titleStyle, iconStyle, headerStyle} = styles;

		if (this.state.isHeaderSearch) {
			return (
				<Header noShadow hasTabs searchBar style={headerStyle}>
					<Animated.View
						style={{
							flex: 1,
							transform: [{
								translateX: this.state.slideAnimation
							}],
							opacity: this.state.opacityAnimation
						}}
					>
						<Item style={{backgroundColor: 'transparent', flex: 1}}>
							<Icon style={iconStyle} name="md-search"/>
							<Input
								style={{color: SEARCH_INPUT_COLOR, flex: 1}}
								placeholderTextColor={ICON_ACTIVE_COLOR}
								placeholder="Поиск..."
								onChangeText={text => this.handleSearch(text)}
							/>
							<Button style={{alignSelf: 'center'}} transparent small onPress={this.handleCloseIcon}>
								<Icon style={iconStyle} name="md-close"/>
							</Button>
						</Item>
					</Animated.View>
				</Header>);
		}

		return (
			<Header hasTabs style={headerStyle}>
				<Left>
					<Title style={titleStyle}>Все проекты</Title>
				</Left>
				<Right>
					<Button transparent small onPress={this.handleSearchIcon}>
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
	const slideAnimation = new Animated.Value(-150);

	return {_projects, slideAnimation};
};

export default connect(mapStateToProps, {projectsFilter})(SearchHeader);
