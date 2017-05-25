import React, {Component} from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import FormComponent from '../FormComponent';
import CustomText from '../CustomText';

const styles = StyleSheet.create({
	element: {
		backgroundColor: COLORS.WHITE,
		borderColor: COLORS.GREY_LIGHT,
		borderWidth: 1,
		borderTopWidth: 0,
		height: 40,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 5
	},
	elementText: {
		flex: 0.9,
		color: COLORS.DARK,
		fontSize: FONT_SIZES.M,
		fontWeight: '500'
	}
});

export default class CheckItem extends FormComponent {

	constructor(props) {
		super(props);
		this.state = {
			value: !!props.value
		};
		this.getValue = this.getValue.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}

	onValueChange() {
		let newValue = !this.state.value;
		this.setState({value: newValue}, ()=>{
			this._updateValue(newValue);
		});
		if(this.props.onValueChange) {
			this.props.onValueChange();
		}
	}

	getValue() {
		return this.state.value;
	}

	setValue(newValue) {
		this.setState({ value: newValue }, () => {
			this._updateValue(newValue, true);
		});
	}

	render() {
		return (
			<View style={[styles.element, this.props.style]}>
				{this.props.label ? <CustomText style={[styles.elementText, this.props.labelStyle]}>{this.props.label}</CustomText> : null}
				<Switch style={this.props.switchStyle} value={this.state.value} onValueChange={this.onValueChange} />
			</View>
		);
	}
}

export class CheckItemNoForm extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={[styles.element, this.props.style]}>
				{this.props.label ? <CustomText style={[styles.elementText, this.props.labelStyle]}>{this.props.label}</CustomText> : null}
				<Switch style={this.props.switchStyle} value={this.props.value} onValueChange={this.props.onValueChange} />
			</View>
		);
	}
}