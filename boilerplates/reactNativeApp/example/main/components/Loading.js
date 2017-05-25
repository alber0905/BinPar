import React, { Component, PropTypes } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	defaultLoading: {
		position: 'absolute',
		//flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'stretch',
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 999,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

export default class Loading extends Component {

	static propTypes = {
		color: PropTypes.string
	};

	constructor(props){
		super(props);
		this.state = {

		};
	}

	render() {
		let content = [(
			<ActivityIndicator
				style={this.props.loaderStyle}
				key="loader"
				animating={true}
				size={this.props.size || "large"}
				color={this.props.color || COLORS.WHITE}
			/>
		)];
		if(this.props.childrenBottom) {
			content.push(this.props.children);
		}
		else {
			content.unshift(this.props.children);
		}
		return (
			<View style={[styles.defaultLoading, this.props.viewStyle]}>
				{content}
			</View>
		);
	}
}