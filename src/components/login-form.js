import React, {Component} from 'react';
import {
	Text,
	Button,
	Spinner,
	Form,
	Item,
	Icon,
	Input,
	Container
} from 'native-base';
import {connect} from 'react-redux';
import {
	Image,
	Animated,
	Easing,
	Platform
} from 'react-native';
/* eslint-disable import/named */
import {Font, AppLoading, LinearGradient} from 'expo';
/* eslint-enable import/named */
import {
	emailChanged,
	passwordChanged,
	loginUser
} from '../actions';

class LoginForm extends Component {
	state = {
		appIsReady: false,
		isPasswordHidden: true
	}

	// Handlers
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

	handlePasswordVisibility = () => {
		this.setState({isPasswordHidden: !this.state.isPasswordHidden});
	}

	// Custom components
	renderButton = () => {
		if (this.props.loading) {
			return <Spinner style={{marginTop: 20}} color="rgba(231, 29, 54, 1)"/>;
		}
		return (
			<Button bordered light onPress={this.handleLogin} style={styles.loginButtonStyle}>
				<Text uppercase={false} style={styles.loginButtonTextStyle}>Войти</Text>
			</Button>
		);
	}

	async componentWillMount() {
		/* eslint-disable camelcase, import/no-extraneous-dependencies */
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
		});
		/* eslint-disable camelcase, import/no-extraneous-dependencies */
		this.setState({appIsReady: true});
	}

	// Lifecycle methods
	componentDidMount() {
		// Animation Section
		if (!this.state.appIsReady) {
			Animated.timing(
				this.props.fadeAnimation,
				{
					toValue: 1,
					duration: 1000,
					easing: Easing.quad
				}
			).start();
		}
	}

	render() {
		const {containerStyle, logoStyle, formStyle, backgroundGradientStyle, passwordRestoreStyle} = styles;

		if (!this.state.appIsReady) {
			return (
				<AppLoading/>
			);
		}

		return (
			<Container style={containerStyle}>
				<LinearGradient
					colors={['#e01473', '#da281c', '#f8c301']}
					style={backgroundGradientStyle}
				>
					<Animated.View
						style={{
							opacity: this.props.fadeAnimation,
							flexDirection: 'column',
							flex: 1
						}}
					>
						<Image
							source={require('../images/logo.png')}
							style={logoStyle}
						/>
						<Form style={formStyle}>
							<Item style={{marginLeft: 0}}>
								<Icon name="person" style={{color: '#ffffff'}}/>
								<Input
									style={{color: '#ffffff'}}
									placeholderTextColor="rgba(255, 255, 255, 0.8)"
									placeholder="Логин"
									onChangeText={this.handleEmailChange}
									value={this.props.email}
								/>
							</Item>
							<Item style={{marginLeft: 0}}>
								<Icon name="lock" style={{color: '#ffffff'}}/>
								<Input
									style={{color: '#ffffff', marginLeft: 2}}
									placeholderTextColor="rgba(255, 255, 255, 0.8)"
									placeholder="Пароль"
									secureTextEntry={this.state.isPasswordHidden}
									onChangeText={this.handlePasswordChange}
									value={this.props.password}
								/>
								<Icon name={this.state.isPasswordHidden ? 'eye-off' : 'eye'} onPress={this.handlePasswordVisibility} style={{color: 'rgba(255, 255, 255, 0.7)'}}/>
							</Item>
							{this.renderButton()}
						</Form>
					</Animated.View>
					<Button transparent light style={passwordRestoreStyle}>
						<Text uppercase={false} style={styles.passwordRestoreTextStyle}>Забыли пароль?</Text>
					</Button>
				</LinearGradient>
			</Container>
		);
	}
}

const styles = {
	containerStyle: {
		flex: 1
	},
	loginButtonStyle: {
		marginTop: '25%',
		width: '100%',
		backgroundColor: 'rgba(255, 255, 255, 1)',
		alignSelf: 'center',
		justifyContent: 'center',

		//Квадратная наверное только у андроида
		borderRadius: (Platform.OS === 'ios') ? 6 : 0,

		// Чуть помясистей
		//paddingLeft: 90,
		//paddingRight: 90,
		//marginLeft: 0,
		//marginRight: 0
	},
	formStyle: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: '10%',
		marginRight: '10%',
		padding: 0,
		marginTop: 60
	},
	logoStyle: {
		// Покрупней
		height: 110,

		resizeMode: 'contain',
		alignSelf: 'center',

		// Поиграться с resizeMode
		marginBottom: 10,
		marginLeft: 30,
		marginRight: 40,
		marginTop: (Platform.OS === 'ios') ? 150 : 80
	},
	loginButtonTextStyle: {
		color: '#da3622',
		fontFamily: 'Roboto',
		fontSize: 17
	},
	backgroundGradientStyle: {
		flex: 1,
		flexDirection: 'column',
		margin: 0
	},
	passwordRestoreTextStyle: {
		color: 'rgba(255, 255, 255, 0.9)',
		fontFamily: 'Roboto',
		fontSize: 15,
		marginBottom: '3%'
	},
	passwordRestoreStyle: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 0
	}
};

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;

	// Variable for animation
	const fadeAnimation = new Animated.Value(0);
	return {email, password, error, loading, fadeAnimation};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
