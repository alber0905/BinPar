import React, {Component} from 'react';
import {Alert, Platform, AppState, DeviceEventEmitter} from 'react-native';
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
	}

	componentWillMount() {
		setTimeout(()=>{
			this.props.navigator.immediatelyResetStack([Router.getRoute('index')], 0);
		}, 1000);
	}

	render() {
		return <SplashScreen />;
	}
}
