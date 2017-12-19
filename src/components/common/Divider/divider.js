import React from 'react';
import {View} from 'react-native';
import styles from './styles';

export default Divider = ({style}) => {
	const {dividerStyle} = styles;
	return (
		<View style={[{...style}, dividerStyle]}/>
	);
};
