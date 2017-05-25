import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {COLORS, EVENTS, FONT_SIZES} from "../utils/constants";
import Button from "./Button";
import CustomText from "./CustomText";
import Badge from "./Badge";

const styles = StyleSheet.create({
	wrapper: {
		height: 30,
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 5,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.MAIN_BLUE,
		overflow: 'hidden'
	},
	element: {
		backgroundColor: COLORS.WHITE,
		borderRadius: 0,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 5,
		paddingHorizontal: 10,
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

export default class NavBarSelector extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: props.selected || 0
		};
	}

	handlePress(index) {
		if(this.state.selected === index){
			return;
		}
		this.setState({selected: index});
		this.props.emitter && this.props.emitter.emit(this.props.eventToEmit, index);
	}

	render() {
		return (
			<View style={styles.wrapper}>
				{this.props.elements.map((element, i)=>{
					let selected = this.state.selected === i;
					return (
						<Button key={`sel_${i}`} noFeedback
						        style={[styles.element, (selected ? styles.selectedElement : null), i === 0 ? styles.firstElement : (i === this.props.elements.length - 1 ? styles.horizontalLastElement : null)]}
						        onPress={this.handlePress.bind(this, i)}>
							<CustomText style={[styles.elementText, (selected ? styles.selectedText : null)]}>{element.text}</CustomText>
							{element.badge ? <Badge eventToListen={`${EVENTS.NAV_BAR_SELECTOR}${this.props.id}`} /> : null}
						</Button>
					);
				})}
			</View>
		);
	}
}