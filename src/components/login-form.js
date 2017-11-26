import React, {Component} from 'react';
import {connect} from 'react-redux';
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
import {
	Image,
	Animated,
	Easing
} from 'react-native';
/* eslint-disable import/named */
import {Font, AppLoading, LinearGradient} from 'expo';
/* eslint-enable import/named */
import {
	emailChanged,
	passwordChanged,
	loginUser
} from '../actions';
import styles from './styles/login-form-styles';
import {LOGIN_GRADIENT_COLORS, INPUT_PLACEHOLDER_TEXT_COLOR, SPINNER_COLOR} from './styles/';

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
			return <Spinner style={styles.spinnerStyle} color={SPINNER_COLOR}/>;
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
		const {
			containerStyle,
			logoStyle,
			formStyle,
			backgroundGradientStyle,
			passwordRestoreStyle,
			itemFixStyle,
			inputIconStyle,
			inputStyle,
			animatedViewStyle,
			passwordRestoreTextStyle
		} = styles;

		if (!this.state.appIsReady) {
			return (
				<AppLoading/>
			);
		}

		return (
			<Container style={containerStyle}>
				<LinearGradient
					colors={LOGIN_GRADIENT_COLORS}
					style={backgroundGradientStyle}
				>
					<Animated.View
						style={[
							animatedViewStyle,
							{opacity: this.props.fadeAnimation}
						]}
					>
						<Image
							source={require('../images/logo.png')}
							style={logoStyle}
						/>
						<Form style={formStyle}>
							<Item style={itemFixStyle}>
								<Icon name="person" style={inputIconStyle}/>
								<Input
									style={inputStyle}
									placeholderTextColor={INPUT_PLACEHOLDER_TEXT_COLOR}
									placeholder="Логин"
									onChangeText={this.handleEmailChange}
									value={this.props.email}
								/>
							</Item>
							<Item style={itemFixStyle}>
								<Icon name="lock" style={inputIconStyle}/>
								<Input
									style={inputStyle}
									placeholderTextColor={INPUT_PLACEHOLDER_TEXT_COLOR}
									placeholder="Пароль"
									secureTextEntry={this.state.isPasswordHidden}
									onChangeText={this.handlePasswordChange}
									value={this.props.password}
								/>
								<Icon name={this.state.isPasswordHidden ? 'eye-off' : 'eye'} onPress={this.handlePasswordVisibility} style={inputIconStyle}/>
							</Item>
							{this.renderButton()}
						</Form>
					</Animated.View>
					<Button transparent light style={passwordRestoreStyle}>
						<Text uppercase={false} style={passwordRestoreTextStyle}>Забыли пароль?</Text>
					</Button>
				</LinearGradient>
			</Container>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;

	// Variable for animation
	const fadeAnimation = new Animated.Value(0);
	return {email, password, error, loading, fadeAnimation};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
