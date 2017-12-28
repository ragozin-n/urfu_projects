import React, {PureComponent} from 'react';
import {Icon} from 'native-base';
import {ICON_ACTIVE_COLOR, ICON_INACTIVE_COLOR} from '../../styles';

export default class TabIcon extends PureComponent {
	render() {
		const color = activeTab === position ? ICON_ACTIVE_COLOR : ICON_INACTIVE_COLOR;
		const {style, name, activeTab, position} = this.props;

		return <Icon style={{...style, color}} name={name}/>;
	}
}
