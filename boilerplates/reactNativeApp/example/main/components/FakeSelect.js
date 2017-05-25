import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import CustomText from './CustomText';
import Button from './Button';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	fakeSelect: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: COLORS.TRANSPARENT,
		borderBottomColor: COLORS.GREY,
		borderBottomWidth: 1,
		height: 30,
		marginBottom: 5,
		marginRight: 10
	},
	fakeSelectText: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.L,
		marginLeft: 2.5
	},
	fakeSelectArrow: {
		backgroundColor: COLORS.TRANSPARENT,
		marginRight: 10
	}
});

export default class FakeSelect extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Button style={[styles.fakeSelect, this.props.style]} onPress={this.props.onPress}>
				<CustomText style={[styles.fakeSelectText, this.props.textStyle]}>{this.props.text}</CustomText><Icon name="ios-arrow-down" size={FONT_SIZES.XXXXL} color={COLORS.GREY_LIGHT} style={styles.fakeSelectArrow} />
			</Button>
		);
	}
}