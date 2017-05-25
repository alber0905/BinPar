import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {COLORS, FONT_SIZES} from "../utils/constants";
import CustomText from "./CustomText";
import Point from "./Point";

const styles = StyleSheet.create({
	listWrapper: {
		justifyContent: 'center'
	},
	elementWrapper: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	elementText: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.M,
		fontWeight: 'normal'
	},
	pointStyle: {
		marginRight: 5
	}
});

export default class List extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if(!this.props.elements || !this.props.elements.length) {
			return null;
		}
		return (
			<View style={[styles.listWrapper, this.props.style]}>
				{this.props.elements.map((element, i)=>{
					return (
						<View style={[styles.elementWrapper, this.props.elementStyle]} key={`el_${i}`}>
							{this.props.decorator === true ? <Point radius={this.props.pointSize || 1}
							                                        color={this.props.pointColor || COLORS.MAIN_BLUE}
							                                        customStyle={[styles.pointStyle, this.props.pointStyle]}/> : (React.isValidElement(this.props.decorator) ? this.props.decorator : null)}
							<CustomText style={[styles.elementText, this.props.elementTextStyle]}>{element}</CustomText>
						</View>
					);
				})}
			</View>
		);
	}
}