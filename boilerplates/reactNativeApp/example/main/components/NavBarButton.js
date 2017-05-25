import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	buttonBar: {
		height: 40,
		backgroundColor: COLORS.TRANSPARENT,
		justifyContent: 'center',
		alignItems: 'center'
	},
	textButtonBar: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.L
	},
	marginLeft: {
		marginLeft: 10
	},
	marginRight: {
		marginRight: 10
	}
});

export default class NavBarButton extends Component {

	constructor(props) {
		super(props);
		if(!props.emitter) {
			throw new Error(`A 'emitter' prop should be passed to a NavBarButton component`);
		}
		if(!props.eventToEmit) {
			console.warn(`There is no 'eventToEmit' prop in NavBarButton element, did you forget to pass the property?`)
		}
		if(props.listenTo && !props.onEventTrigger) {
			console.warn(`There is a 'listenTo' property but there is no 'onEventTrigger' function that can be executed`);
		}
		this.handleNavBarButtonPress = this.handleNavBarButtonPress.bind(this);
		if(props.onEventTrigger) {
			this.onEventTrigger = props.onEventTrigger.bind(this);
		}
	}

	componentWillMount() {
		if(this.props.listenTo && this.onEventTrigger) {
			this._subscription = this.props.emitter.addListener(this.props.listenTo, this.onEventTrigger);
		}
	}

	componentWillUnmount() {
		this._subscription && this._subscription.remove();
	}

	handleNavBarButtonPress() {
		this.props.eventToEmit && this.props.emitter.emit(this.props.eventToEmit);
	}

	render() {
		return (
			<TouchableOpacity style={[styles.buttonBar, (this.props.position === 'left' ? styles.marginLeft : styles.marginRight), this.props.style]} onPress={this.handleNavBarButtonPress} {...this.props.customProps}>
				<CustomText style={styles.textButtonBar}>{this.props.children}</CustomText>
			</TouchableOpacity>
		);
	}
}