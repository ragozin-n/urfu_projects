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
import {connect} from 'react-redux';
import styles from '../styles/search-header-styles';
import { ICON_COLOR } from '../styles/colors';

class SearchHeader extends Component {
	state = {
		isHeaderSearch: false
	}

	render() {
		const {titleStyle, iconStyle} = styles;

		if (this.state.isHeaderSearch) {
			console.log('header');
			return (
				<Header hasTabs searchBar style={{backgroundColor: 'transparent'}}>
					<Item style={{backgroundColor: 'transparent'}}>
						<Icon style={iconStyle} name="ios-search"/>
						<Input style={iconStyle} placeholderTextColor={ICON_COLOR} placeholder="Search"/>
						<Button transparent onPress={() => this.setState({isHeaderSearch: false})}>
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
					<Button transparent onPress={() => this.setState({isHeaderSearch: true})}>
						<Icon style={iconStyle} name="ios-search"/>
					</Button>
				</Right>
			</Header>);
	}
}

export default connect(null, {})(SearchHeader);
