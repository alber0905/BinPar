import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';

const styles = StyleSheet.create({
	textWrapper: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		overflow: 'hidden'
	},
	icon: {
		width: FONT_SIZES.L,
		backgroundColor: COLORS.TRANSPARENT,
		textAlign: 'center'
	},
	text: {
		flex: 0.9,
		fontSize: FONT_SIZES.XS,
		color: COLORS.DARK,
		fontWeight: '400',
		backgroundColor: COLORS.TRANSPARENT
	}
});

export default class LabelWithIcon extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let customProps = {...this.props.customProps};
		if(!this.props.multipleLines) {
			customProps.ellipsizeMode = 'tail';
			customProps.numberOfLines = 1;
		}
		return (
			<View style={[styles.textWrapper, this.props.style]} >
				{React.isValidElement(this.props.icon) || this.props.icon === null ? this.props.icon : <Icon style={[styles.icon, this.props.iconStyle]} size={FONT_SIZES.L} name={this.props.icon} color={COLORS.MAIN_BLUE} />}
				<CustomText style={[styles.text, this.props.textStyle]} customProps={customProps}>{this.props.text}</CustomText>
			</View>
		);
	}
}