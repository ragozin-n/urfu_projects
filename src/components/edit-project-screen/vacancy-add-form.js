import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Item, Icon, Input, Button, Text} from 'native-base';
import {projectUpdate} from '../../actions';
import {View} from 'react-native';

class VacancyAddForm extends Component {
	state = {
		name: '',
		description: '',
		skills: ''
	}

	handleSaveVacancy = () => {
		const {name, description, skills} = this.state;
		const {project} = this.props;
		this.props.projectUpdate({
			project,
			vacancy: {
				name,
				description,
				skills
			}
		});
		this.props.onHideForm();
	}

	render() {
		return (
			<View>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="md-document"/>
					<Input
						value={this.state.name}
						onChangeText={text => this.setState({name: text})}
						placeholder="Название вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="md-list"/>
					<Input
						value={this.state.description}
						onChangeText={text => this.setState({description: text})}
						placeholder="Описание вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={{borderColor: 'transparent', paddingHorizontal: 15}}>
					<Icon active name="hammer"/>
					<Input
						value={this.state.skills}
						onChangeText={text => this.setState({skills: text})}
						placeholder="Ключевые навыки вакансии через запятую"
						placeholderTextColor="grey"
					/>
				</Item>
				<Button full danger style={{marginTop: 15}} onPress={this.handleSaveVacancy}>
					<Text>Сохранить вакансию</Text>
				</Button>
			</View>);
	}
}

export default connect(null, {projectUpdate})(VacancyAddForm);
