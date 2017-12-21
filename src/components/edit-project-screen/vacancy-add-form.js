import React, {Component} from 'react';
import {Card, Item, Icon, Input} from 'native-base';
import {View} from 'react-native';

class VacancyAddForm extends Component {
	state = {
		name: '',
		description: '',
		skills: ''
	}
	render() {
		return (
			<Card>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="md-clipboard"/>
					<Input
						value={this.state.name}
						onChangeText={text => this.setState({name: text})}
						placeholder="Название вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="md-list-box"/>
					<Input
						value={this.state.description}
						onChangeText={text => this.setState({description: text})}
						placeholder="Описание вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="md-pricetags"/>
					<Input
						value={this.state.skills}
						onChangeText={text => this.setState({skills: text})}
						placeholder="Ключевые навыки вакансии через запятую"
						placeholderTextColor="grey"
					/>
				</Item>
			</Card>);
	}
}

export default VacancyAddForm;
