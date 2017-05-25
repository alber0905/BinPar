import React, {Component} from 'react';
import {Alert, Platform, AppState, DeviceEventEmitter} from 'react-native';
import Meteor, {createContainer} from 'react-native-meteor';
import I18n from '../lang/lang';
import PushNotification from'react-native-push-notification';
import BinPar from '../utils/fw';
import SplashScreen from '../components/SplashScreen';
import { Router } from '../index';

export default class Init extends Component {

	static route = {
		navigationBar: {
			visible: false
		}
	};

	constructor(props) {
		super(props);
		this.state = { notification: null, currentAppState: AppState.currentState };
		this._routed = false;
		this._FWReady = false;
	}

	componentWillMount() {
		BinPar.whenReady().then(() => {
			this._FWReady = true;
			this.enroute();
		}).catch((err) => {
			console.log('Error en el setup del framework', err);
		});
		Meteor.Accounts.onLogin(() => {
			BinPar.whenReady().then(() => {
				BinPar.DB.users.setupPushTokenAndOS({ pushToken: this._registerToken, os: Platform.OS }, (err, res) => {
					if(err) {
						console.log('[Init] - setupPushTokenAndOS', err);
					}
				});
			});
			let currentRoute = this.props.navigator.getCurrentRoute();
			let forceRoute = !currentRoute || currentRoute.routeName === 'init' || currentRoute.routeName === 'login' || currentRoute.routeName === 'signUp';
			this.enroute(forceRoute);
		});
		Meteor.Accounts.onLoginFailure((err)=> {
			console.log('onLoginFailure', err);
			// Alert.alert(I18n.t('alert_error_title'), I18n.t('alert_login_error_text'));
			// this.goToView({view: require('./Intro').default });
		});
		PushNotification.configure({

			// (optional) Called when Token is generated (iOS and Android)
			onRegister: (token) => {
				this._registerToken = token.token;
			},

			// (required) Called when a remote or local notification is opened or received
			onNotification: (notification) => {
				console.log('[NOTIFICACIÓN]', notification);
				if(notification.foreground){
					DeviceEventEmitter.emit();
				}
				else{
					let user = Meteor.user();
					if(user) {

					} else {

					}
				}
			},

			// ANDROID ONLY: (optional) GCM Sender ID.
			senderID: "512891638875",

			// IOS ONLY (optional): default: all - Permissions to register.
			permissions: {
				alert: true,
				badge: true,
				sound: true
			},

			// Should the initial notification be popped automatically
			// default: true
			popInitialNotification: true,

			/**
			 * IOS ONLY: (optional) default: true
			 * - Specified if permissions will requested or not,
			 * - if not, you must call PushNotificationsHandler.requestPermissions() later
			 */
			requestPermissions: true
		});
	}

	_goToScreen = (name, params) => {
		return () => {
			this._routed = true;
			this.props.navigator.immediatelyResetStack([Router.getRoute(name, params)], 0);
		};
	};

	goToView(name, params){
		if(this._goToViewTimer){
			clearTimeout(this._goToViewTimer);
			this._goToViewTimer = null;
		}
		this._goToViewTimer = setTimeout(this._goToScreen(name, params), 200);
	}

	enroute(force) {
		if(this._FWReady && (!this._routed || force === true)) {
			let user = Meteor.user();
			if(!user){
				this.goToView('intro');
				return;
			}
			if(this._registerToken) {
				BinPar.DB.users.registerTokenForUser(this._registerToken, Platform.OS);
			}
			if(user.profile.lang){
				I18n.setLocale(user.profile.lang);
			}
			if(user.profile.userType === 'candidate') {
				if(!user.profile.candidate || !user.profile.candidate.ownedDemands || user.profile.candidate.ownedDemands.length === 0) {
					this.goToView('jobsList', { showCancel: false, edit: false, isCandidate: true });
				} else if(!user.profile.candidate || !user.profile.candidate.id_number) {
				 	this.goToView('candidateEditProfile', { isNewUser: true });
				} else if(user.profile.candidate.years_of_experience > 0 && (!user.profile.candidate.experiences || user.profile.candidate.experiences.length === 0)) {
				 	this.goToView('candidateEditExperience', { isNewUser: true });
				} else {
					this.goToView('candidateHome');
				}
			} else {
				if(!user.profile.family || !user.profile.family.ownedOffers || user.profile.family.ownedOffers.length === 0) {
					this.goToView('jobsList', { showCancel: false, edit: false, isCandidate: false, skip: true });
				} else {
					this.goToView('familyHome');
				}
			}
		}
	}

	render() {
		return <SplashScreen />;
	}
}
