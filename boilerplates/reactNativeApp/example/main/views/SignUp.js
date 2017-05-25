import React, {Component} from "react";
import {Alert, KeyboardAvoidingView, Linking, ScrollView, StyleSheet} from "react-native";
import I18n from "../lang/lang";
import Scene from "../components/Scene";
import CustomText from "../components/CustomText";
import Button from "../components/Button";
import {COLORS, FONT_SIZES, STYLES} from "../utils/constants";
import {processTextWithEmphasis} from "../utils/misc";
import Icon from "react-native-vector-icons/FontAwesome";
import Panel from "../components/Panel";
import Validations from "../utils/validations";
import Form from "../components/Form";
import Input from "../components/Input";
import Separator from "../components/Separator";
import BinPar from "../utils/fw";
import Meteor from "react-native-meteor";
import Loading from "../components/Loading";
import {facebookLogin, getUserInfo} from "../utils/fbUtils";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch',
		padding: 15,
		paddingLeft: 10,
		paddingRight: 10
	},
	panelFacebook: {
		paddingTop: 10,
		paddingBottom: 10,
		justifyContent: 'center',
	},
	facebookButton: {
		backgroundColor: COLORS.DARK_BLUE,
		flexDirection: 'row',
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
	separator: {
		marginTop: 10,
		marginBottom: 10
	},
	nextButton: {
		margin: 30,
		marginTop: 20,
		marginBottom: 15
	},
	nextText: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.L
	},
	legalText: {
		fontSize: FONT_SIZES.XS,
		fontWeight: '500',
		textAlign: 'center'
	},
	linkLegal: {
		textDecorationLine: 'underline'
	}
});

export default class SignUp extends Component {

	static route = {
		navigationBar: {
			backgroundColor: COLORS.WHITE,
			tintColor: COLORS.MAIN_BLUE,
			renderTitle: (route)=> { return <CustomText style={STYLES.navBarTitle}>{I18n.t('create_account')}</CustomText>; }
		}
	};

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			facebookSignedIn: false
		};

		this.signUpWithFacebook = this.signUpWithFacebook.bind(this);
		this._getThisScrollResponder = this._getThisScrollResponder.bind(this);
		this.doSignUp = this.doSignUp.bind(this);
		this.validateAndSubmitForm = this.validateAndSubmitForm.bind(this);
	}

	signUpWithFacebook() {
		this.setState({facebookSignedIn: true});
		facebookLogin().then((token) => {
			getUserInfo().then((data)=>{
				this.refs.signUpForm && this.refs.signUpForm.fillForm({
					name: data.first_name,
					surname: data.last_name,
					email: data.email
				});
				setTimeout(()=>{
					this.validateAndSubmitForm();
				}, 1000);
			}).catch((err)=>{
				console.log('[getUserInfo]', err);
				this.setState({facebookSignedIn: false});
			});
		}).catch((err)=>{
			console.log('[facebookLogin]', err);
			this.setState({facebookSignedIn: false});
		});
	}

	doSignUp(formData) {
		this.setState({loading: true});
		formData.userType = this.props.signupType;
		BinPar.DB.users.customCreateUser(formData, (err, res)=>{
			if(err) {
				console.log(err);
				this.setState({loading: false});
				Alert.alert(I18n.t('alert_error_title'), I18n.t('alert_register_error_text'));
			}
			else {
				if(res.ok){
					Meteor.loginWithPassword(formData.email, formData.password, (err)=>{
						if(err){
							//show error
							console.log('[AUTOLOGIN Register] Error: ', err);
						}
						this.setState({loading: false});
					});
				}
				else{
					Alert.alert(I18n.t('alert_error_title'), res.error);
					this.setState({loading: false});
				}
			}
		});
	}

	validateAndSubmitForm() {
		this.refs.signUpForm && this.refs.signUpForm._goToNextOrSubmit();
	}

	_getThisScrollResponder() {
		return this.refs.containerScroll && this.refs.containerScroll.getScrollResponder();
	}

	_handleLink(index) {
		console.log(index);
		if(index === 1) {
			Linking.openURL(BinPar.CONSTANTS[I18n.locale].URL_TERMS).catch((err) => {
				console.log('[SignUp - _handleLink(index: 1)]', err);
			});
		} else {
			Linking.openURL(BinPar.CONSTANTS[I18n.locale].URL_PRIVACY_POLICY).catch((err) => {
				console.log('[SignUp - _handleLink(index: 3)]', err);
			});
		}
	}

	_processLegalText(str) {
		let res = processTextWithEmphasis(str);
		return res.map((textObj, i)=>{
			return <CustomText customProps={{onPress: textObj.strong ? this._handleLink.bind(this, i) : null }} key={`l_${i}`} style={[styles.legalText, textObj.strong ? styles.linkLegal : null]}>{textObj.value}</CustomText>
		});
	}

	render() {
		return (
			<Scene>
				<ScrollView ref="containerScroll" contentContainerStyle={styles.content} >
					<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-20}>
						{this.state.facebookSignedIn ? null : (
							<Panel style={styles.panelFacebook}>
								<Button style={styles.facebookButton} onPress={this.signUpWithFacebook}>
									<Icon name="facebook" size={20} color={COLORS.WHITE} /><CustomText style={styles.facebookText}>{I18n.t('signup_with_facebook')}</CustomText>
								</Button>
							</Panel>
						)}
						{this.state.facebookSignedIn ? null : <Separator style={styles.separator} text={I18n.t('or')} />}
						<Panel>
							<Form ref="signUpForm" noScroll={true} customScrollResponder={this._getThisScrollResponder} onSubmit={this.doSignUp}>
								<Input editable={!this.state.loading} exportDataKey="name" placeholder={I18n.t('name')} type="text" validationRules={[Validations.isRequired]} />
								<Input editable={!this.state.loading} exportDataKey="surname" placeholder={I18n.t('surname')} type="text" validationRules={[Validations.isRequired]} />
								<Input editable={!this.state.loading} exportDataKey="email" placeholder={I18n.t('email')} type="email" autoCorrect={false} autoCapitalize="none" validationRules={[Validations.isRequired]} />
								<Input editable={!this.state.loading} exportDataKey="phone" placeholder={I18n.t('phone')} type="phone" validationRules={[Validations.isRequired]} />
								<Input editable={!this.state.loading} exportDataKey="password" placeholder={I18n.t('password')} type="password" clearButtonMode="never" showPassword={true} validationRules={[Validations.isRequired]} />
							</Form>
							<Button style={styles.nextButton} onPress={this.validateAndSubmitForm}>
								<CustomText style={styles.nextText}>{I18n.t('next')}</CustomText>
							</Button>
						</Panel>
						<CustomText style={styles.legalText}>{this._processLegalText(I18n.t('legal_agreement_signup'))}</CustomText>
					</KeyboardAvoidingView>
				</ScrollView>
				{ this.state.loading ? <Loading color={COLORS.WHITE} /> : null }
			</Scene>
		);
	}
}