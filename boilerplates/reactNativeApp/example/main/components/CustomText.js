import React, {Component} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';
import { COLORS, FONT_SIZES } from '../utils/constants';

const styles = StyleSheet.create({
	defaultText: {
		// fontFamily: 'WorkSans-Regular',
		color: COLORS.DARK,
		fontSize: FONT_SIZES.S
	}
});

export default class CustomText extends Component {

	constructor(props) {
		super(props);
		// this.state = {};
	}

	render() {
		if(this.props.animated){
			return (
				<Animated.Text style={[styles.defaultText, this.props.style]}>{this.props.children}</Animated.Text>
			);
		}
		else {
			return (
				<Text style={[styles.defaultText, this.props.style]} {...this.props.customProps}>{this.props.children}</Text>
			);
		}
	}
}