import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from "../components/Button";
import {COLORS} from "../utils/constants";
import Icon from "react-native-vector-icons/Ionicons";

const styles = StyleSheet.create({
	button: {
		backgroundColor: COLORS.TRANSPARENT,
		paddingLeft: 15,
		paddingRight: 15
	},
	icon: {
		marginBottom: 10
	}
});

export default class BackArrow extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<Button style={styles.button} onPress={this.props.onPress}>
				<Icon style={styles.icon} name="ios-arrow-back" color={COLORS.MAIN_BLUE} size={35}/>
			</Button>
		);
	}
}