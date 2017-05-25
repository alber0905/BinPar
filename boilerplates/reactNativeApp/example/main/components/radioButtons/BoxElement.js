import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {COLORS, FONT_SIZES} from "../../utils/constants";
import Button from "../Button";
import CustomText from "../CustomText";

const styles = StyleSheet.create({
	element: {
		backgroundColor: COLORS.WHITE,
		borderRadius: 0,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		paddingLeft: 15,
		paddingRight: 15,
		borderLeftWidth: 1,
		borderLeftColor: COLORS.MAIN_BLUE
	},
	firstElement: {
		borderLeftWidth: 0
	},
	selectedElement: {
		backgroundColor: COLORS.MAIN_BLUE
	},
	elementText: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.M,
		fontWeight: '500'
	},
	selectedText: {
		color: COLORS.WHITE
	}
});

export default class BoxElement extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let buttonStyles = [styles.element];
		if(this.props.selected) {
			buttonStyles.push(styles.selectedElement);
		}
		if (this.props.isFirstElement) {
			buttonStyles.push(styles.firstElement);
		}
		buttonStyles.push(this.props.style);
		return (
			<Button noFeedback style={buttonStyles} onPress={this.props.onPress}>
				<CustomText style={[styles.elementText, (this.props.selected ? styles.selectedText : null), this.props.textStyle]}>{this.props.label}</CustomText>
			</Button>
		);
	}
}