import React, {Component} from 'react';
import {
	Header,
	Body,
	Icon,
	Input,
	Button,
	Title,
	Right,
	Item
} from 'native-base';
import _ from 'lodash';
import {Animated, Easing} from 'react-native';
import {connect} from 'react-redux';
import {SEARCH_INPUT_COLOR, ICON_ACTIVE_COLOR} from '../../styles';
import {projectsFilter} from '../../../actions/projects-actions';
import styles from './styles';

class SearchHeader extends Component {
	state = {
		isHeaderSearch: false,
		slideAnimation: new Animated.Value(-10),
		opacityAnimation: new Animated.Value(0)
	};

	handleSearch = text => {
		const {projectsFilter} = this.props;

		projectsFilter(text, this.props._projects);
	};

	handleSearchIcon = () => {
		const {slideAnimation, opacityAnimation, isHeaderSearch} = this.state;

		Animated.parallel([
			Animated.timing(
				slideAnimation,
				{
					toValue: 0,
					duration: 450,
					easing: Easing.bezier(0.785, 0.135, 0.15, 0.86),
					useNativeDriver: true
				}
			),
			Animated.timing(
				opacityAnimation,
				{
					toValue: 1,
					duration: 550,
					easing: Easing.ease,
					useNativeDriver: true
				}
			)
		]).start();
		this.setState({isHeaderSearch: !isHeaderSearch});
	};

	handleCloseIcon = () => {
		const {projectsFilter} = this.props;

		this.setState(
			{
				slideAnimation: new Animated.Value(-10),
				isHeaderSearch: !this.state.isHeaderSearch,
				opacityAnimation: new Animated.Value(0)
			});

		projectsFilter('', this.props._projects);
	};

	render() {
		const {titleStyle, iconStyle, headerStyle} = styles;
		const {slideAnimation, opacityAnimation, isHeaderSearch} = this.state;

		if (isHeaderSearch) {
			return (
				<Header noShadow hasTabs searchBar style={headerStyle}>
					<Animated.View
						style={{
							flex: 1,
							transform: [{
								translateX: slideAnimation
							}],
							opacity: opacityAnimation
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
				<Body style={{flex: 3, alignItems: 'flex-start'}}>
					<Title style={titleStyle}>Все проекты</Title>
				</Body>
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
