import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import PropTypes from 'prop-types';
import {Icon} from 'native-base';
import {ICON_ACTIVE_COLOR, ICON_INACTIVE_COLOR} from '../../styles';

export default class TabIcon extends PureComponent {
	static propTypes = {
		style: Text.propTypes.style,
		// Имя иконки Ionicons
		name: PropTypes.string.isRequired,
		activeTab: PropTypes.number.isRequired,
		position: PropTypes.number.isRequired
	}

	static defaultProps = {
		style: {}
	}

	render() {
		const color = activeTab === position ? ICON_ACTIVE_COLOR : ICON_INACTIVE_COLOR;
		const {style, name, activeTab, position} = this.props;

		return <Icon style={{...style, color}} name={name}/>;
	}
}
