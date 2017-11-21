import React, {Component} from 'react';
import {View, Slider, Picker} from 'react-native';
import {connect} from 'react-redux';
import {
	Form,
	Item,
	Input,
	Label,
	Text
} from 'native-base';
import {projectInfoUpdate} from '../actions';

class ProjectForm extends Component {
	// Handlers
	handleNameInput = value => {
		this.props.projectInfoUpdate({prop: 'name', value});
	}

	handleCountInput = value => {
		this.props.projectInfoUpdate({prop: 'count', value});
	}

	handlePriorityInput = value => {
		this.props.projectInfoUpdate({prop: 'priority', value});
	}

	render() {
		const {labelStyle, sliderStyle, itemStyle, pickerStyle} = styles;

		return (
			<View>
				<Form>
					<Item floatingLabel>
						<Label>Name</Label>
						<Input
							value={this.props.name}
							onChangeText={value => this.handleCountInput(value)}
						/>
					</Item>
					<Item style={itemStyle}>
						<Text style={labelStyle}>{this.props.count}</Text>
						<Slider
							style={sliderStyle}
							minimumValue={0}
							maximumValue={50}
							step={1}
							value={this.props.count}
							onValueChange={count => this.handleCountInput(count)}
						/>
					</Item>
					<Item style={itemStyle}>
						<Text style={labelStyle}>Choose priority: </Text>
						<Picker
							style={pickerStyle}
							onValueChange={priority => this.handlePriorityInput(priority)}
							selectedValue={this.props.priority}
						>
							<Picker.Item label="High" value="high"/>
							<Picker.Item label="Middle" value="mid"/>
							<Picker.Item label="Low" value="low"/>
						</Picker>
					</Item>
				</Form>
			</View>
		);
	}
}

const styles = {
	labelStyle: {
		fontSize: 30,
		fontWeight: '300',
		textAlign: 'center'
	},
	sliderStyle: {
		width: '100%',
		margin: 10
	},
	pickerStyle: {
		width: '100%'
	},
	itemStyle: {
		flexDirection: 'column',
		justifyContent: 'center'
	}
};

const mapStateToProps = ({projectForm}) => {
	// DEBUG
	console.log(projectForm);
	const {name, count, priority} = projectForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {projectInfoUpdate})(ProjectForm);
