import React, {PureComponent} from 'react';
import {View, ViewPropTypes} from 'react-native';
import styles from './styles';

export default class Divider extends PureComponent {
	static propTypes = {
		style: ViewPropTypes.style
	}

	static defaultProps = {
		style: {}
	}

	render() {
		const {dividerStyle} = styles;
		const {style} = this.props;

		return (
			<View style={[{...style}, dividerStyle]}/>
		);
	}
}
