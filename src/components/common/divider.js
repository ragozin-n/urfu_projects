import React from 'react';
import {View} from 'react-native';

export default Divider = ({style}) => {
	return (<View style={[{...style}, {flex: 1, height: 4, backgroundColor: '#F5F5F5', borderColor: '#F0F0F0', borderBottomWidth: 1, borderTopWidth: 1}]}/>);
};
