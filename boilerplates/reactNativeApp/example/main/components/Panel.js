import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/constants';

const styles = StyleSheet.create({
	default: {
		backgroundColor: COLORS.WHITE,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderColor: COLORS.GREY_LIGHT,
		borderWidth: 1,
		borderRadius: 5
	}
});

export default class Panel extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View style={[styles.default, this.props.style]}>
				{React.Children.map(this.props.children, (child) => child)}
			</View>
		);
	}
}