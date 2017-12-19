import React from 'react';
import {Text, Icon} from 'native-base';
import styles from './styles';

export default Counter = ({many, of, light}) => {
	const {lightIconStyle, iconStyle, textStyle} = styles;
	if (light) {
		return (
			<Text note>
				{`${many}/${of} `}<Icon style={lightIconStyle} name="md-person"/>
			</Text>);
	}

	return (
		<Text style={textStyle}>
			<Icon style={iconStyle} name="md-people"/>  Участники: ({many}/{of})
		</Text>);
};
