import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';

const styles = StyleSheet.create({
	default: {
		backgroundColor: COLORS.MAIN_BLUE,
		height: 55,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 2
	},
	textButtonBar: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.M
	}
});

export default class Button extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		if(this.props.noFeedback) {
			return (
				<TouchableWithoutFeedback onPress={this.props.onPress} {...this.props.customProps}>
					<View style={[styles.default, this.props.style]}>
						{this.props.children}
					</View>
				</TouchableWithoutFeedback>
			);
		}
		else {
			return (
				<TouchableOpacity style={[styles.default, this.props.style]} onPress={this.props.onPress} {...this.props.customProps}>
					{this.props.children}
				</TouchableOpacity>
			);
		}
	}
}