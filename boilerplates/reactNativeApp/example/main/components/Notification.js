import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, TouchableOpacity, DeviceEventEmitter} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import CustomText from './CustomText';

const DEVICE_NOTIF_EVENT = 'remoteNotificationReceived';

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		flexDirection: 'row',
		left: 0,
		right: 0,
		top: -1,
		backgroundColor: COLORS.MAIN_GREEN,
		overflow: 'hidden'
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginRight: 10,
		marginTop: 5,
		height: 30,
		width: 50,
		backgroundColor: COLORS.WHITE,
		borderRadius: 2.5,
		elevation: 1,
		shadowColor: COLORS.DARK,
		shadowOffset: {
			width: -1,
			height: 1
		},
		shadowOpacity: 1,
		shadowRadius: 1
	},
	buttonText: {
		color: COLORS.MAIN_GREEN,
		fontSize: FONT_SIZES.M,
		fontWeight: '600'
	},
	textView: {
		flex: 0.85,
		justifyContent: 'center',
		alignItems: 'stretch',
		marginLeft: 10,
		marginTop: 5
	},
	title: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.L,
		fontWeight: '500'
	},
	description: {
		color: COLORS.WHITE,
		fontSize: FONT_SIZES.S
	}
});

export default class Notification extends Component {

	constructor(props) {
		super(props);
		this._animatedHeight = new Animated.Value(0);
		this.state = {
			title: '',
			description: '',
			timeout: 5000,
			maxHeight: 65
		};

		this.handleNotificationEvent = this.handleNotificationEvent.bind(this);
		this.showNotification = this.showNotification.bind(this);
		this.hideNotification = this.hideNotification.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;
		DeviceEventEmitter.addListener(DEVICE_NOTIF_EVENT, this.handleNotificationEvent);
	}

	componentWillUnmount() {
		this._isMounted = false;
		DeviceEventEmitter.removeListener(DEVICE_NOTIF_EVENT, this.handleNotificationEvent)
	}

	handleNotificationEvent(notificationData) {
		this.setState(Object.assign({}, this.state, notificationData), this.showNotification);
	}

	hideNotification(duration){
		if(this._isMounted) {
			Animated.timing(this._animatedHeight, {
				toValue: 0,
				duration: duration || 400
			}).start();
		}
	}

	showNotification(){
		Animated.spring(this._animatedHeight, {
			toValue: this.state.maxHeight,
			friction: 6
		}).start(()=>{
			this.state.timeout && setTimeout(this.hideNotification, this.state.timeout);
		});
	}

	render() {
		return (
			<Animated.View style={[styles.wrapper, this.state.style, {height: this._animatedHeight}]}>
				<View style={styles.textView}>
					{this.state.title ? <CustomText style={styles.title}>{this.state.title}</CustomText> : null}
					{this.state.description ? <CustomText style={styles.description}>{this.state.description}</CustomText> : null}
				</View>
				<TouchableOpacity style={[styles.button, this.state.buttonStyle]} onPress={this.state.onPress === 'hide' ? this.hideNotification : this.state.onPress}>
					<CustomText style={[styles.buttonText, this.state.buttonTextStyle]}>{this.state.buttonText}</CustomText>
				</TouchableOpacity>
			</Animated.View>
		);
	}
}