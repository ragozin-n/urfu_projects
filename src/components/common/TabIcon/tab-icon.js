import React from 'react';
import {Icon} from 'native-base';
import {ICON_ACTIVE_COLOR, ICON_INACTIVE_COLOR} from '../../styles';

export default TabIcon = ({style, name, activeTab, position}) => {
	const color = activeTab === position ? ICON_ACTIVE_COLOR : ICON_INACTIVE_COLOR;

	return <Icon style={{...style, color}} name={name}/>;
};
