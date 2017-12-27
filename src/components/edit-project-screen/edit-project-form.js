import React, {Component} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
	Container,
	Icon,
	Button,
	Header,
	Body,
	Title,
	Right,
	Content,
	Text,
	Left,
	Item,
	Input
} from 'native-base';
// eslint-disable-next-line import/named
import {LinearGradient, ImagePicker} from 'expo';
import {connect} from 'react-redux';
import {PROJECTS_LIST_GRADIENT_COLORS} from '../styles';
import Divider from '../common/Divider/divider';
import {projectUpdate} from '../../actions';
import VacancyAddForm from './vacancy-add-form';
import styles from './styles';

class ProjectEditForm extends Component {
	state = {
		name: '',
		description: '',
		keywords: '',
		photoBase64: '',
		isVacancyFormVisible: false
	}

	handleAddVacancy = () => {
		this.setState({isVacancyFormVisible: true});
	}

	handleHideForm = () => {
		this.setState({isVacancyFormVisible: false});
	}

	handleCloseButton = () => {
		Actions.main();
	}

	handleSaveButton = () => {
		const {projectUpdate} = this.props;
		const {project} = this.props;
		const {name, description, photoBase64, keywords} = this.state;

		Actions.main();
		projectUpdate(
			{
				project,
				name: name || project.name,
				description: description || project.description,
				photoBase64: photoBase64 || project.photoBase64,
				keywords: keywords || project.keywords
			}
		);
	}

	handleImageSelect = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true,
			exif: false,
			mediaTypes: 'images'
		});

		if (!result.cancelled) {
			this.setState({photoBase64: `data:image/jpeg;base64,${result.base64}`});
		}
	};

	render() {
		const {project} = this.props;
		const {name, description, photoBase64, keywords} = project;
		const {isVacancyFormVisible} = this.state;
		const {
			headerStyle,
			iconStyle,
			headerTitleStyle,
			headerBodyStyle,
			projectImageStyle,
			contentStyle,
			itemStyle,
			addVacancyButtonStyle
		} = styles;

		return (
			<Container>
				<LinearGradient
					colors={PROJECTS_LIST_GRADIENT_COLORS}
					start={[0, 0]}
					end={[1, 0]}
				>
					<Header hasTabs style={headerStyle}>
						<Left>
							<Button transparent small onPress={this.handleCloseButton}>
								<Icon style={iconStyle} name="md-close"/>
							</Button>
						</Left>
						<Body style={headerBodyStyle}>
							<Title style={headerTitleStyle}>Редактирование проекта</Title>
						</Body>
						<Right>
							<Button transparent small onPress={this.handleSaveButton}>
								<Icon style={iconStyle} name="md-checkmark"/>
							</Button>
						</Right>
					</Header>
					<TouchableOpacity activeOpacity={0.5} onPress={this.handleImageSelect}>
						{
							<Image
								style={projectImageStyle}
								resizeMode="cover"
								source={{uri: this.state.photoBase64 || photoBase64}}
							/>
						}
					</TouchableOpacity>
				</LinearGradient>
				<Content style={contentStyle}>
					<Item style={itemStyle}>
						<Icon active name="md-clipboard"/>
						<Input
							value={this.state.name || name}
							onChangeText={text => this.setState({name: text})}
							placeholder="Название проекта"
							placeholderTextColor="grey"
						/>
					</Item>
					<Item style={itemStyle}>
						<Icon active name="md-list-box"/>
						<Input
							value={this.state.description || description}
							onChangeText={text => this.setState({description: text})}
							placeholder="Описание"
							placeholderTextColor="grey"
						/>
					</Item>
					<Divider/>
					<Item style={itemStyle}>
						<Icon active name="md-pricetags"/>
						<Input
							value={this.state.keywords || keywords}
							onChangeText={text => this.setState({keywords: text})}
							placeholder="Ключевые слова через запятую"
							placeholderTextColor="grey"
						/>
					</Item>
					<Divider/>
					{
						isVacancyFormVisible ?
							<VacancyAddForm onHideForm={this.handleHideForm} project={project}/> :
							<Button full danger style={addVacancyButtonStyle} onPress={this.handleAddVacancy}>
								<Text>Добавить вакансию</Text>
							</Button>
					}
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	const {isCurator, photoBase64} = state.auth.user;
	const {uid} = state.auth._token;

	return {isCurator, photoBase64, uid};
};

export default connect(mapStateToProps, {projectUpdate})(ProjectEditForm);
