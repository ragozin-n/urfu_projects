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
import {LinearGradient, Audio} from 'expo';
import {
	emailChanged,
	passwordChanged,
	loginUser
} from '../../actions';
import {
	LOGIN_GRADIENT_COLORS,
	INPUT_PLACEHOLDER_TEXT_COLOR,
	SPINNER_COLOR
} from '../styles/';
import styles from './styles';

class LoginForm extends Component {
	state = {
		isPasswordHidden: true,
		fadeAnimation: new Animated.Value(0)
	}

	handleEmailChange = text => {
		this.props.emailChanged(text);
	}

	handlePasswordChange = text => {
		this.props.passwordChanged(text);
	}

	handleLogin = () => {
		const {email, password, loginUser} = this.props;

		loginUser({email, password});
	}

	handlePasswordVisibility = () => {
		this.setState({isPasswordHidden: !this.state.isPasswordHidden});
	}

	renderButton = () => {
		const {loading} = this.props;
		const {loginButtonStyle, loginButtonTextStyle} = styles;

		if (loading) {
			return (
				<Button
					full
					transparent
					style={loginButtonStyle}
				>
					<Spinner color={SPINNER_COLOR}/>
				</Button>);
		}

		return (
			<Button
				full
				bordered
				light
				onPress={this.handleLogin}
				style={loginButtonStyle}
			>
				<Text uppercase={false} style={loginButtonTextStyle}>
					Войти
				</Text>
			</Button>
		);
	}

	async componentDidMount() {
		try {
			await Audio.setIsEnabledAsync(true);
			await Expo.Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				allowsRecordingIOS: false,
				interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
				shouldDuckAndroid: false,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
			});
			const sound = new Audio.Sound();
			await sound.loadAsync(require('../../sounds/login.mp3'));
			await sound.setVolumeAsync(0.8);
			await sound.playAsync();
		} catch (err) {
			console.log(err);
		}
		Animated.timing(
			this.state.fadeAnimation,
			{
				toValue: 1,
				duration: 800,
				easing: Easing.bezier(0.42, 0, 1, 1),
				useNativeDriver: true
			}
		).start();
	}

	render() {
		const {
			logoStyle,
			formStyle,
			backgroundGradientStyle,
			itemFixStyle,
			inputIconStyle,
			inputStyle,
			animatedViewStyle
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
							{opacity: this.state.fadeAnimation}
						]}
					>
						<Form style={formStyle}>
							<Image
								source={require('../../images/logo.png')}
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
					{/* <Button transparent light style={passwordRestoreStyle}>
						<Text uppercase={false} style={passwordRestoreTextStyle}>Забыли пароль?</Text>
					</Button>				 */}
				</Content>
			</LinearGradient>
		);
	}
}

const mapStateToProps = ({auth}) => {
	const {email, password, error, loading} = auth;

	return {email, password, error, loading};
};

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser})(LoginForm);
