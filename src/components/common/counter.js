import React from 'react';
import {Text, Icon} from 'native-base';

export default Counter = ({many, of, light}) => {
	if (light) {
		return (
			<Text note>
				{`${many}/${of} `}<Icon style={{fontSize: 14}} name="md-person"/>
			</Text>);
	}

	return (
		<Text style={{color: 'black', textAlign: 'center'}}>
			<Icon style={{fontSize: 18, color: 'black'}} name="md-people"/>  Участники: ({many}/{of})
		</Text>);
};
