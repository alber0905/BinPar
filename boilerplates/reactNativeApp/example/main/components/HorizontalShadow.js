import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, Platform} from 'react-native';

const styles = StyleSheet.create({
	basicStyleiOS: {
		flex: 1,
		height: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		alignSelf: 'stretch',
		shadowOpacity: 0.6,
		shadowRadius: 4,
		shadowOffset: {
			height: 2,
			width: 0
		}
	},
	basicStyleAndroid: {
		flex: 1,
		height: 1,
		position: 'absolute',
		left: 0,
		right: 0,
		alignSelf: 'stretch',
		elevation: 9
	}
});

export default class HorizontalShadow extends Component {

	static propTypes = {
		top: PropTypes.number.isRequired,
		backgroundColor: PropTypes.string.isRequired,
		shadowColor: PropTypes.string
	};

	static defaultProps = {
		top: 64,
		backgroundColor: '#e6e6e6',
		shadowColor: '#000000'
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	_getShadow(){
		if (Platform.OS === 'android') {
			return null;
		}
		else{
			return <View style={[styles.basicStyleiOS, {top: this.props.top, backgroundColor: this.props.backgroundColor, shadowColor: this.props.shadowColor}]}></View>;
		}
	}

	render() {
		return this._getShadow();
	}
}