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
		slideAnimation: new Animated.Value(-150),
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
				slideAnimation: new Animated.Value(-150),
				isHeaderSearch: !this.state.isHeaderSearch,
				opacityAnimation: new Animated.Value(0)
			});
	};

	render() {
		const {titleStyle, iconStyle} = styles;

		if (this.state.isHeaderSearch) {
			return (
				<Header hasTabs searchBar style={{backgroundColor: 'transparent'}}>
					{/* <Item style={{backgroundColor: 'transparent'}}> */}
					<Animated.View
						style={{
							flex: 1,
							transform: [{
								translateX: this.state.slideAnimation
							}],
							opacity: this.state.opacityAnimation
						}}
					>
						<Item style={{backgroundColor: 'transparent'}}>
							<Icon style={iconStyle} name="md-search"/>
							<Input
								style={{color: SEARCH_INPUT_COLOR, flex: 1}}
								placeholderTextColor={ICON_ACTIVE_COLOR}
								placeholder="Поиск..."
								onChangeText={text => this.handleSearch(text)}
							/>
						</Item>
					</Animated.View>
					<Button transparent small onPress={this.handleCloseIcon}>
						<Icon style={iconStyle} name="md-close"/>
					</Button>
					{/* </Item> */}
				</Header>);
		}

		return (
			<Header hasTabs style={{backgroundColor: 'transparent'}}>
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
