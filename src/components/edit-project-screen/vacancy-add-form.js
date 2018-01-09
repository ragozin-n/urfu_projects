import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Item, Icon, Input, Button, Text} from 'native-base';
import {View} from 'react-native';
import {projectUpdate} from '../../actions';
//import styles from './styles';

class VacancyAddForm extends Component {
	state = {
		name: '',
		description: '',
		skills: ''
	}

	handleSaveVacancy = () => {
		const {name, description, skills} = this.state;
		const {project, projectUpdate, onHideForm} = this.props;

		projectUpdate({
			project,
			vacancy: {
				name,
				description,
				skills
			}
		});
		onHideForm();
	}

	render() {
		const {
			itemStyle,
			addVacancyButtonStyle
		} = styles;
		const {name, description, skills} = this.state;

		return (
			<View>
				<Item style={itemStyle}>
					<Icon active name="md-document"/>
					<Input
						value={name}
						onChangeText={text => this.setState({name: text})}
						placeholder="Название вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={itemStyle}>
					<Icon active name="md-list"/>
					<Input
						value={description}
						onChangeText={text => this.setState({description: text})}
						placeholder="Описание вакансии"
						placeholderTextColor="grey"
					/>
				</Item>
				<Item style={itemStyle}>
					<Icon active name="hammer"/>
					<Input
						value={skills}
						onChangeText={text => this.setState({skills: text})}
						placeholder="Ключевые навыки вакансии через запятую"
						placeholderTextColor="grey"
					/>
				</Item>
				<Button full danger style={addVacancyButtonStyle} onPress={this.handleSaveVacancy}>
					<Text>
						{'Сохранить вакансию'}
					</Text>
				</Button>
			</View>);
	}
}

const styles = {
	headerStyle: {
		backgroundColor: 'transparent'
	},
	headerBodyStyle: {
		flex: 3,
		alignItems: 'flex-start'
	},
	headerTitleStyle: {
		color: 'white'
	},
	iconStyle: {
		color: 'white'
	},
	projectImageStyle: {
		height: 200
	},
	contentStyle: {
		backgroundColor: 'white'
	},
	itemStyle: {
		borderColor: 'transparent',
		paddingHorizontal: 15
	},
	addVacancyButtonStyle: {
		marginTop: 15
	}
};

export default connect(null, {projectUpdate})(VacancyAddForm);
