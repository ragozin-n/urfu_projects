import React, {PureComponent} from 'react';
import {View} from 'react-native';
import styles from './styles';

export default class Divider extends PureComponent {
	render() {
		const {dividerStyle} = styles;
		const {style} = this.props;

		return (
			<View style={[{...style}, dividerStyle]}/>
		);
	}
}
