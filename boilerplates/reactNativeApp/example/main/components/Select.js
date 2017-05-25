import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../lang/lang';
import {COLORS, FONT_SIZES} from '../utils/constants';
import FormComponent from './FormComponent';
import FakeSelect from './FakeSelect';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	label: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.M,
		fontWeight: '500',
		marginBottom: 5
	},
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

export default class Select extends FormComponent {

	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};

		this.showPicker = this.showPicker.bind(this);
	}

	updateValue(newValue, dontDispatchChange) {
		let label = newValue;
		if(({}).toString.call(newValue) === '[object Object]'){
			label = newValue.toString();
			newValue = newValue.value != null ? newValue.value : newValue.label;
		}
		this.setState({value: newValue, label}, ()=>{
			this._updateValue(newValue, dontDispatchChange === true);
		});
	}

	getValue() {
		return this.state.value;
	}

	setValue(newValue) {
		this.updateValue(newValue, true);
	}

	showPicker() {
		this.props.showPicker && this.props.showPicker(this.state.value);
	}

	render() {
		return (
			<View style={this.props.style}>
				{this.props.label ? <CustomText style={[styles.label, this.props.labelStyle]}>{this.props.label}</CustomText> : null}
				<FakeSelect style={this.props.buttonStyle} textStyle={this.props.textStyle} onPress={this.showPicker} text={this.state.value != null ? this.state.label : I18n.t('select_an_option')} />
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}