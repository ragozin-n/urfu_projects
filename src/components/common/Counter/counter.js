import React, {PureComponent} from 'react';
import {Text, Icon} from 'native-base';
import styles from './styles';

export default class Counter extends PureComponent {
	render() {
		const {lightIconStyle, iconStyle, textStyle} = styles;
		const {many, of, light} = this.props;
		if (light) {
			return (
				<Text note>
					{`${many}/${of} `}
					<Icon style={lightIconStyle} name="md-person"/>
				</Text>);
		}

		return (
			<Text style={textStyle}>
				<Icon style={iconStyle} name="md-people"/>
				{` Участники: (${many}/${of})`}
			</Text>);
	}
}
