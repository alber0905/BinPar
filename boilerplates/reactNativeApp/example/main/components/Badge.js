import React, {Component} from "react";
import {DeviceEventEmitter, StyleSheet, View} from "react-native";
import {COLORS} from "../utils/constants";
import CustomText from "./CustomText";

const DEFAULT_SIZE = 20;
const POSITIONS = [{position: 'left', direction: 'h'}, {position: 'top', direction: 'v'}, {position: 'right', direction: 'h'}, {position: 'bottom', direction: 'v'}];
const styles = StyleSheet.create({
	wrapper: {
		zIndex: 2,
		position: 'absolute',
		backgroundColor: COLORS.RED,
		justifyContent: 'center',
		alignItems: 'center'
	},
	counterText: {
		color: COLORS.WHITE,
		backgroundColor: COLORS.TRANSPARENT,
		fontWeight: '600',
		textAlign: 'center',
		textAlignVertical: 'center',
		marginHorizontal: 5
	}
});
const HIDE = true;

export default class Badge extends Component {

	constructor(props) {
		super(props);
		if(!props.eventToListen) {
			console.warn('It\'s strongly recommended to set a "eventToListen" property');
		}
		this.state = {
			count: props.count || 0
		};
	}

	componentWillMount() {
		if(this.props.eventToListen) {
			this._subscription = DeviceEventEmitter.addListener(this.props.eventToListen, this._handleEvent);
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.count !== this.props.count){
			this.setState({count: Math.max(0, nextProps.count)});
		}
	}

	componentWillUnmount() {
		if(this.props.eventToListen) {
			this._subscription.remove();
		}
	}

	_handleEvent({action, value}) {
		switch (action) {
			case 'reset':
				this.resetCounter();
				break;
			case 'increase':
				this.increaseCounter(value);
				break;
			case 'decrease':
				this.decreaseCounter(value);
				break;
		}
	}

	resetCounter(value) {
		this.setState({count: Math.max(0, value)});
	}

	increaseCounter(value) {
		value = value || 1;
		let newCount = (this.state.count || 0) + value;
		this.setState({count: newCount});
		return newCount;
	}

	decreaseCounter(value) {
		value = value || 1;
		if(!this.state.count){
			return 0;
		}
		let newCount = Math.max(0, this.state.count - value);
		this.setState({count: newCount});
		return newCount;
	}

	render() {
		if (!this.state.count || HIDE) {
			return null;
		}
		let size = this.props.size || DEFAULT_SIZE;
		let borderRadius = size * 0.5;
		let alignStyles = {};
		let align = this.props.align || 'top right';
		let positionOffset = this.props.offset || { h: -borderRadius, v: -borderRadius };
		POSITIONS.forEach((pos)=>{
			if(align.indexOf(pos.position) !== -1) {
				alignStyles[pos.position] = positionOffset[pos.direction];
			}
		});
		return (
			<View style={[styles.wrapper, this.props.style, alignStyles, {height: size, minWidth: size, borderRadius}]}>
				<CustomText style={[styles.counterText, {fontSize: size * 0.75}, this.props.textStyle]} customProps={{ numberOfLines: 1 }}>{this.state.count}</CustomText>
			</View>
		);
	}
}