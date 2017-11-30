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
	Content
} from 'native-base';
import {
	Image,
	Animated,
	Easing
} from 'react-native';
// eslint-disable-next-line import/named
import {LinearGradient} from 'expo';
import {
	emailChanged,
	passwordChanged,
	loginUser
} from '../actions';
import styles from './styles/login-form-styles';
import {
	LOGIN_GRADIENT_COLORS,
	INPUT_PLACEHOLDER_TEXT_COLOR,
	SPINNER_COLOR
} from './styles/';

class LoginForm extends Component {
	state = {
		isPasswordHidden: true
	}

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

	renderButton = () => {
		if (this.props.loading) {
			return <Spinner style={styles.spinnerStyle} color={SPINNER_COLOR}/>;
		}

		return (
			<Button full bordered light onPress={this.handleLogin} style={styles.loginButtonStyle}>
				<Text uppercase={false} style={styles.loginButtonTextStyle}>Войти</Text>
			</Button>
		);
	}

	componentDidMount() {
		Animated.timing(
			this.props.fadeAnimation,
			{
				toValue: 1,
				duration: 1000,
				easing: Easing.quad
			}
		).start();
	}

	render() {
		const {
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

		return (
			<LinearGradient
				colors={LOGIN_GRADIENT_COLORS}
				style={backgroundGradientStyle}
			>
				<Content
					keyboardShouldPersistTaps="never"
					scrollEnabled={false}
				>
					<Animated.View
						style={[
							animatedViewStyle,
							{opacity: this.props.fadeAnimation}
						]}
					>
						<Form style={formStyle}>
							<Image
								source={require('../images/logo.png')}
								style={logoStyle}
							/>
							<Item style={itemFixStyle}>
								<Icon name="person" style={inputIconStyle}/>
								<Input
									style={inputStyle}
									placeholderTextColor={INPUT_PLACEHOLDER_TEXT_COLOR}
									placeholder="Логин"
									onChangeText={this.handleEmailChange}
									value={this.props.email}
									returnKeyType="next"
									keyboardType="email-address"
									autoFocus
									onSubmitEditing={() => this.passwordInput._root.focus()}
								/>
							</Item>
							<Item style={itemFixStyle}>
								<Icon name="lock" style={inputIconStyle}/>
								<Input
									ref={input => this.passwordInput = input}
									returnKeyType="send"
									selectTextOnFocus
									style={inputStyle}
									placeholderTextColor={INPUT_PLACEHOLDER_TEXT_COLOR}
									placeholder="Пароль"
									secureTextEntry={this.state.isPasswordHidden}
									onChangeText={this.handlePasswordChange}
									value={this.props.password}
									onSubmitEditing={this.handleLogin}
								/>
								<Icon name={this.state.isPasswordHidden ? 'eye-off' : 'eye'} onPress={this.handlePasswordVisibility} style={inputIconStyle}/>
							</Item>
							{this.renderButton()}
						</Form>
					</Animated.View>
				</Content>
				<Button transparent light style={passwordRestoreStyle}>
					<Text uppercase={false} style={passwordRestoreTextStyle}>Забыли пароль?</Text>
				</Button>
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;
	const fadeAnimation = new Animated.Value(0);

	return {email, password, error, loading, fadeAnimation};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
