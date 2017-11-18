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
import {taskUpdate} from '../actions';

class TaskForm extends Component {
	// Handlers
	handleNameInput = value => {
		this.props.taskUpdate({prop: 'name', value});
	}

	handleCountInput = value => {
		this.props.taskUpdate({prop: 'count', value});
	}

	handlePriorityInput = value => {
		this.props.taskUpdate({prop: 'priority', value});
	}

	render() {
		const {labelStyle, sliderStyle} = styles;

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
					<Item style={{flexDirection: 'column', justifyContent: 'center'}}>
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

					<Item style={{flexDirection: 'column', justifyContent: 'center'}}>

						<Text style={labelStyle}>Choose priority: </Text>

						<Picker
							style={styles.pickerStyle}
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
	}
};

const mapStateToProps = ({taskForm}) => {
	const {name, count, priority} = taskForm;
	return {name, count, priority};
};

export default connect(mapStateToProps, {taskUpdate})(TaskForm);
