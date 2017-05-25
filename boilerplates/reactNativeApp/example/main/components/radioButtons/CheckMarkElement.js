import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import Button from '../Button';
import CustomText from '../CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const CHECKMARK_SIZE = FONT_SIZES.XXXXXL * 2;

const styles = StyleSheet.create({
	element: {
		backgroundColor: COLORS.WHITE,
		borderColor: COLORS.GREY_LIGHT,
		borderWidth: 1,
		borderTopWidth: 0,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingLeft: 5,
		paddingRight: 5
	},
	firstElement: {
		borderTopColor: COLORS.GREY_LIGHT,
		borderTopWidth: 1
	},
	elementText: {
		flex: 0.9,
		color: COLORS.DARK,
		fontSize: FONT_SIZES.M,
		fontWeight: '500'
	},
	icon: {
		backgroundColor: COLORS.TRANSPARENT
	}
});

export default class CheckMarkElement extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let shouldPutLabelInCustomText = !React.isValidElement(this.props.label);
		return (
			<Button noFeedback style={[styles.element, (this.props.isFirstElement ? styles.firstElement : null), this.props.style]} onPress={this.props.onPress}>
				{shouldPutLabelInCustomText ? <CustomText style={[styles.elementText, this.props.textStyle]}>{this.props.label}</CustomText> : this.props.label}
				{this.props.selected ? (
					<Icon style={styles.icon} name="ios-checkmark" color={COLORS.MAIN_GREEN} size={CHECKMARK_SIZE} />
				) : null}
			</Button>
		);
	}
}