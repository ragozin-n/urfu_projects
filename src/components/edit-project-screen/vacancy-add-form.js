import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Item, Icon, Input, Button, Text} from 'native-base';
import {View} from 'react-native';
import {projectUpdate} from '../../actions';
import styles from './styles';

class VacancyAddForm extends Component {
	static propTypes = {
		project: PropTypes.shape({
			name: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired,
			photoBase64: PropTypes.string.isRequired,
			keywords: PropTypes.string.isRequired
		}).isRequired,
		projectUpdate: PropTypes.func.isRequired,
		onHideForm: PropTypes.func
	}

	static defaultProps = {
		onHideForm: () => {}
	}

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

export default connect(null, {projectUpdate})(VacancyAddForm);
