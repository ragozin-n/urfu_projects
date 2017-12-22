import React, {Component} from 'react';
import {Linking, TouchableOpacity} from 'react-native';
import {WebBrowser} from 'expo';
import {
	Container,
	Content,
	H3,
	H1
} from 'native-base';

class SettingsForm extends Component {
	handleGoToRepo = () => {
		WebBrowser.openBrowserAsync('https://github.com/ragozin-n/urfu_projects');
	}

	handleGoToExpo = () => {
		WebBrowser.openBrowserAsync('https://expo.io/@ragozin-n/urfu_projects');
	}

	handleSendEmail = () => {
		Linking.openURL('mailto:somethingemail@gmail.com?subject=abcdefg&body=body');
	}

	render() {
		return (
			<Container>
				<Content style={{paddingHorizontal: 30, paddingTop: 150}}>
					<H1>Урфу.Проекты</H1>
					<TouchableOpacity activeOpacity={0.5} onPress={this.handleGoToRepo}>
						<H3>- Репозиторий</H3>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={this.handleGoToExpo}>
						<H3>- Expo</H3>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.5} onPress={this.handleSendEmail}>
						<H3>- Email</H3>
					</TouchableOpacity>
				</Content>
			</Container>
		);
	}
}
export default SettingsForm;
