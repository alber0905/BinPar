import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import I18n from '../lang/lang';
import {COLORS, FONT_SIZES, STYLES} from '../utils/constants';
import Button from './Button';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		left: 0,
		right: 0,
		alignItems: 'center'
	},
	floating: {
		height: 35,
		backgroundColor: COLORS.WHITE,
		borderColor: COLORS.MAIN_BLUE,
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10
	},
	top: {
		top: 10
	},
	bottom: {
		bottom: 10
	},
	text: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.M,
		fontWeight: '500'
	}
});

export default class FloatingButton extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={[styles.wrapper, this.props.position === 'top' ? styles.top : styles.bottom]} pointerEvents="box-none">
				<Button style={styles.floating} onPress={this.props.onPress}>
					<CustomText style={styles.text}>{this.props.text}</CustomText>
				</Button>
			</View>
		);
	}
}