import React, {Component} from 'react';
import { 
	Content, 
	Card, 
	CardItem, 
	Body, 
	Text, 
	Button, 
	Spinner, 
	Form, 
	Item, 
	Label, 
	Input, 
	Container, 
	Header, 
	Left, 
	Right, 
	Title
} from 'native-base';
import {connect} from 'react-redux';
import {
	Image, 
	View,
	Animated,
	Easing,
	Platform
} from 'react-native';
import {
	emailChanged, 
	passwordChanged, 
	loginUser
} from '../actions';
// import {Video} from 'expo';

class LoginForm extends Component {

	//Handlers
	handleEmailChange = text => {
		this.props.emailChanged(text);
	}

	handlePasswordChange = text => {
		this.props.passwordChanged(text);
	}

	handleLogin = () => {
		const {email, password} = this.props;
		this.props.loginUser({email, password});
	}

	//Custom components
	renderButton = () => {
		if (this.props.loading) {
			return <Spinner style={{marginTop: 20}} color="rgba(231, 29, 54, 1)" />;
		}
		return (
			<Button onPress={this.handleLogin} style={styles.loginButtonStyle}>
				<Text style={styles.loginButtonTextStyle}>Войти</Text>
			</Button>
		);
	}

	//Lifecycle methods
	componentDidMount() {
		//Animation Section
		Animated.timing(
			this.props.fadeAnimation,
			{
				toValue: 1,
				duration: 900,
				easing: Easing.quad
			}
		).start();
	}

	render() {
		return (
			<Container style={styles.containerStyle}>
				{/* <Header>
					<Body>
						<Title>Урфу.Проекты</Title>
					</Body>
				</Header> */}
				<Animated.View
					style={{
						opacity: this.props.fadeAnimation
					}}
				>
					<Image
						source={require('../images/urfu-logo.png')}
						style={styles.logoStyle}
					/>
					<Form style={styles.formStyle}>
						<Item floatingLabel>
							<Label style={styles.labelTextStyle}>Логин</Label>
							<Input
								onChangeText={this.handleEmailChange}
								value={this.props.email}
							/>
						</Item>
						<Item floatingLabel last>
							<Label style={styles.labelTextStyle}>Пароль</Label>
							<Input
								secureTextEntry
								onChangeText={this.handlePasswordChange}
								value={this.props.password}
							/>
						</Item>
						{this.renderButton()}
					</Form>
				</Animated.View>
			</Container>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: 'rgba(253, 255, 252, 1)'
	},
	loginButtonStyle: {
		marginTop: 40,
		backgroundColor: 'rgba(231, 29, 54, 1)',
		alignSelf: 'center',

		//Чуть покруглей
		borderRadius: 6,

		//Чуть помясистей
		padding: (Platform.OS === 'ios') ? 60 : 25
	},
	formStyle: {
		marginTop: 15,
		marginLeft: 25,
		marginRight: 25
	},
	logoStyle: {
		//Покрупней
		height: 150,

		resizeMode: 'contain',
		alignSelf: 'center',

		//Поиграться с resizeMode
		marginBottom: 10,
		marginLeft: 40,
		marginRight: 40,
		marginTop: (Platform.OS === 'ios') ? 130 : 60
	},
	loginButtonTextStyle: {
		// fontFamily: 'Roboto'
	},
	labelTextStyle: {
		// fontFamily: 'Roboto'
	}
};

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;

	//Variable for animation
	const fadeAnimation = new Animated.Value(0);
	return {email, password, error, loading, fadeAnimation};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
