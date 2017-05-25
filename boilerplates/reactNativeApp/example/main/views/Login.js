import React, {Component} from "react";
import {StyleSheet, View, ScrollView, Alert} from "react-native";
import I18n from "../lang/lang";
import Scene from "../components/Scene";
import CustomText from "../components/CustomText";
import Button from "../components/Button";
import {COLORS, FONT_SIZES} from "../utils/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import Panel from "../components/Panel";
import Validations from "../utils/validations";
import Form from "../components/Form";
import SimpleInput from "../components/SimpleInput";
import Separator from "../components/Separator";
import {facebookLogin} from "../utils/fbUtils";
import Meteor from "react-native-meteor";
import Loading from "../components/Loading";
import {Router} from "../index";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch',
		paddingLeft: 10,
		paddingRight: 10
	},
	title: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.XXXXXL,
		textAlign: 'center'
	},
	panelSignUp: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	loginButton: {
		margin: 15,
		marginLeft: 30,
		marginRight: 30
	},
	loginButtonText: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.XL,
		fontWeight: '500'
	},
	forgotPasswordButton: {
		backgroundColor: COLORS.TRANSPARENT,
		height: FONT_SIZES.XS,
		marginBottom: 5
	},
	forgotPasswordText: {
		color: COLORS.GREY,
		fontSize: FONT_SIZES.XS
	},
	facebookButton: {
		backgroundColor: COLORS.DARK_BLUE,
		flexDirection: 'row',
		marginTop: 10,
		marginLeft: 30,
		marginRight: 30,
		height: 35
	},
	facebookText: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.XS,
		marginLeft: 5,
		fontWeight: '500'
	},
	signUpButton: {
		backgroundColor: COLORS.TRANSPARENT,
		height: FONT_SIZES.XS,
		marginLeft: 20
	},
	signUpText: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.XL,
		fontWeight: '500',
		textDecorationLine: 'underline'
	},
	separator: {
		marginTop: 10,
		marginBottom: 10
	},
	dontHaveAcc: {
		fontWeight: '600',
		fontSize: FONT_SIZES.S
	},
	loader: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'stretch',
		backgroundColor: 'rgba(0,0,0,0.8)',
		zIndex: 999,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	loaderText: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.XL,
		fontWeight: '500',
		marginBottom: 20
	}
});

export default class Login extends Component {

	static route = {
		navigationBar: {
			backgroundColor: COLORS.WHITE,
			title: '',
			tintColor: COLORS.MAIN_BLUE
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			facebookLoggingIn: false,
			loggingIn: false
		};

		this._onSubmitLogin = this._onSubmitLogin.bind(this);
		this.forgotPassword = this.forgotPassword.bind(this);
		this.tryLogin = this.tryLogin.bind(this);
		this.loginWithFacebook = this.loginWithFacebook.bind(this);
		this.goToSignUp = this.goToSignUp.bind(this);
	}

	forgotPassword() {
		this.props.navigator.push(Router.getRoute('rememberPassword'));
	}

	tryLogin() {
		this.refs.loginForm && this.refs.loginForm._goToNextOrSubmit();
	}

	_onSubmitLogin(formData, cleanForm) {
		this.setState({loggingIn: true});
		this._logginTimer = setTimeout(() => {
			this.setState({loggingIn: false});
		}, 10000);
		Meteor._startLoggingIn();
		Meteor.call('login', {
			email: formData.email,
			passwordFF: formData.password,
			lang: I18n.locale,
			customFFLogin: true
		}, (err, res) => {
			Meteor._endLoggingIn();
			if (err) {
				console.warn('[CALL users.FFLogin]', err);
				//show popup indicando que si está registrado con otra cuenta de correo
				Alert.alert(I18n.t('auth_error'), err.reason);
			}
			else {
				cleanForm();
				Meteor._handleLoginCallback(err, res);
			}
			clearTimeout(this._logginTimer);
			this._logginTimer = null;
			this.setState({loggingIn: false});
		});
	}

	loginWithFacebook() {
		this.setState({facebookLoggingIn: true});
		facebookLogin().then((data) => {
			Meteor._startLoggingIn();
			Meteor.call('login', {email: btoa(data.email), customFbLogin: true}, (err, res) => {
				Meteor._endLoggingIn();
				if (err) {
					console.warn('[CALL users.loginWithFacebook]', err);
					if (err.error === '0001') {
						//show popup indicando que si está registrado con otra cuenta de correo
						Alert.alert(I18n.t('error_email_not_found_title'), I18n.t('error_email_not_found_text'));
					}
				}
				else {
					Meteor._handleLoginCallback(err, res);
				}
			});
		}).catch((err) => {
			console.log(err);
		}).then(() => {
			this.setState({facebookLoggingIn: false});
		});
	}

	goToSignUp() {
		this.props.navigator.push(Router.getRoute('signUp', {signupType: this.props.route.params.title === 'find_job' ? 'candidate' : 'family'}));
	}

	render() {
		return (
			<Scene>
				<ScrollView contentContainerStyle={styles.content}>
					<CustomText style={styles.title}>{I18n.t(this.props.route.params.title)}</CustomText>
					<Panel>
						<Form ref="loginForm" noScroll={true} onSubmit={this._onSubmitLogin}>
							<SimpleInput exportDataKey="email"
										 icon={<Icon name="user" size={20} color={COLORS.MAIN_BLUE}/>} iconPadding={30}
										 placeholder={I18n.t('email')} type="email" autoCorrect={false}
										 autoCapitalize="none" validationRules={[Validations.isRequired]}/>
							<SimpleInput exportDataKey="password" showPassword={true}
										 icon={<Icon name="lock" size={20} color={COLORS.MAIN_BLUE}/>} iconPadding={30}
										 placeholder={I18n.t('password')} type="password"
										 validationRules={[Validations.isRequired]}/>
						</Form>
						<Button style={styles.loginButton} onPress={this.tryLogin}>
							<CustomText style={styles.loginButtonText}>{I18n.t('login_button_text')}</CustomText>
						</Button>
						<Button style={styles.forgotPasswordButton} onPress={this.forgotPassword}>
							<CustomText style={styles.forgotPasswordText}>{I18n.t('forgot_password')}</CustomText>
						</Button>
						<Separator style={styles.separator} text={I18n.t('or')}/>
						<Button style={styles.facebookButton} onPress={this.loginWithFacebook}>
							<Icon name="facebook" size={20} color={COLORS.WHITE}/><CustomText
							style={styles.facebookText}>{I18n.t('login_with_facebook')}</CustomText>
						</Button>
					</Panel>
					<Panel style={styles.panelSignUp}>
						<CustomText style={styles.dontHaveAcc}>{I18n.t('dont_have_an_account')}</CustomText>
						<Button style={styles.signUpButton} onPress={this.goToSignUp}>
							<CustomText style={styles.signUpText}>{I18n.t('register')}</CustomText>
						</Button>
					</Panel>
				</ScrollView>
				{ this.state.loggingIn ? (
						<Loading viewStyle={styles.loader}>
							<CustomText style={styles.loaderText}>{I18n.t('logging_in')}...</CustomText>
						</Loading>
					) : null }
				{ this.state.facebookLoggingIn ? (
						<Loading viewStyle={styles.loader}>
							<CustomText style={styles.loaderText}>{I18n.t('logging_in_with_facebook')}...</CustomText>
						</Loading>
					) : null }
			</Scene>
		);
	}
}