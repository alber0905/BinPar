import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/constants';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	separator: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingLeft: 15,
		paddingRight: 15
	},
	separatorLine: {
		flex: 0.3,
		height: 1,
		marginTop: 3,
		backgroundColor: COLORS.MAIN_BLUE
	},
	separatorText: {
		color: COLORS.MAIN_BLUE,
		fontSize: 16,
		marginLeft: 7.5,
		marginRight: 7.5,
	}});

export default class Separator extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.separator, this.props.style]}>
				<CustomText style={[styles.separatorLine, this.props.lineStyle]}> </CustomText>
				<CustomText style={[styles.separatorText, this.props.textStyle]}>{this.props.text || ' '}</CustomText>
				<CustomText style={[styles.separatorLine, this.props.lineStyle]}> </CustomText>
			</View>
		);
	}
}