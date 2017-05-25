import React, {Component} from "react";
import {Animated, StyleSheet, Text} from "react-native";
import Dimensions from "Dimensions";
import {COLORS, FONT_SIZES} from "../utils/constants";
import {BlurView} from "react-native-blur";
import Button from "./Button";
import CustomText from "./CustomText";

const styles = StyleSheet.create({
	collapsibleWrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: COLORS.TRANSPARENT,
		overflow: 'hidden'
	},
	mask: {
		position: 'absolute',
		bottom: 0,
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: COLORS.TRANSPARENT
	},
	picker: {
		position: 'absolute',
		bottom:0,
		left:0,
		right:0,
		height: 210
	},
	OKButton: {
		position: 'absolute',
		zIndex: 1,
		height: 25,
		backgroundColor: COLORS.TRANSPARENT,
		justifyContent: 'center',
		alignItems: 'flex-end',
		right: 0,
		left: 0,
		top: 0,
		paddingRight: 10
	},
	OKText: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.L
	}
});

export default class CollapsibleView extends Component {

	constructor(props) {
		super(props);
		this._height = new Animated.Value(0);
		this.state = {
			element: null,
			show: false,
			maxHeight: Dimensions.get('window').height
		};
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	show(elementToRender){
		if(!this.state.show && !this.state.animating){
			this.setState({animating: true, element: elementToRender, maxHeight: Dimensions.get('window').height}, ()=>{
				Animated.timing(this._height, {
					toValue: this.state.maxHeight,
					duration: 400
				}).start(()=>{this.setState({animating: false, show: true})});
			});
		}
	}

	hide(){
		if(this.state.show && !this.state.animating){
			this.setState({animating: true});
			Animated.timing(this._height, {
				toValue: 0,
				duration: 400
			}).start(()=>{this.setState({animating: false, show: false})});
		}
	}

	refresh(element) {
		this.setState({element});
	}

	render() {
		return (
			<Animated.View style={[styles.collapsibleWrapper, {height: this._height}]}>
				<Text style={styles.mask} onPress={this.hide}></Text>
				<BlurView style={styles.picker} blurType="xlight">
					<Button style={styles.OKButton} onPress={this.hide}>
						<CustomText style={styles.OKText}>OK</CustomText>
					</Button>
					{this.state.element}
				</BlurView>
			</Animated.View>
		);
	}
}