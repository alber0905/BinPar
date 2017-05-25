import React, {Component} from 'react';
import {StyleSheet, TextInput, View, findNodeHandle} from 'react-native';
import {COLORS, FONT_SIZES, REMOVE_JUNK_REGEXP, VALID_INFO_REGEXP} from '../utils/constants';
import FormComponent from './FormComponent';
import CustomText from './CustomText';

const styles = StyleSheet.create({
	wrapper: {
		borderColor: COLORS.GREY_LIGHT,
		borderWidth: 1,
		borderRadius: 5,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10
	},
	textInput: {
		backgroundColor: COLORS.WHITE,
		color: COLORS.DARK,
		fontSize: FONT_SIZES.S,
		// fontFamily: 'WorkSans-Regular'
	},
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

const DEFAULT_INITIAL_MIN_HEIGHT = 70;
const DEFAULT_INITIAL_MAX_HEIGHT = 200;
const DEFAULT_MAX_LENGTH = 1500;

export default class Textarea extends FormComponent {

	constructor(props) {
		super(props);
		this.state = {
			value: props.initialValue || '',
			inputHeight: props.initialHeight || DEFAULT_INITIAL_MIN_HEIGHT
		};

		this.onValueChange = this.onValueChange.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onBlur = this._onBlur.bind(this);
	}

	onValueChange(event) {
		this.setState({
			value: event.nativeEvent.text,
			inputHeight: event.nativeEvent.contentSize.height
		});
	}

	updateValue(newValue, height, dontDispatchChange) {
		if(this._updateTimer) {
			clearTimeout(this._updateTimer);
			this._updateTimer = null;
		}
		this._updateTimer = setTimeout(this._updateValue.bind(this, newValue, dontDispatchChange === true), 250);
	}

	getValue() {
		return this.state.value;
	}

	setValue(newValue) {
		this.setState({value: newValue}, () => {
			this.updateValue(newValue, null, true);
		});
	}

	_onFocus(e) {
		this.props.onCustomFocus && this.props.onCustomFocus(e);
	}

	_onBlur(e) {
		if(this.state.value.replace(REMOVE_JUNK_REGEXP, '').match(VALID_INFO_REGEXP)) {
			this.props.onWrongInfo && this.props.onWrongInfo();
		}
		this.updateValue(this.state.value);
		this.props.onCustomBlur && this.props.onCustomBlur(e);
	}

	render() {
		return (
			<View ref="wrapper" style={[styles.wrapper, this.props.style]}>
				<TextInput style={[styles.textInput, this.props.inputStyle, {height: Math.min(Math.max(this.props.minHeight || DEFAULT_INITIAL_MIN_HEIGHT, this.state.inputHeight), this.props.maxHeight || DEFAULT_INITIAL_MAX_HEIGHT)}]}
						   ref="input"
						   onChange={this.onValueChange}
						   value={this.state.value}
						   multiline={true}
						   maxLength={this.props.maxLength || DEFAULT_MAX_LENGTH}
						   onFocus={this._onFocus}
						   onBlur={this._onBlur}
						   placeholderTextColor={this.props.placeholderColor || COLORS.GREY_MEDIUM}
						   placeholder={this.props.placeholder} />
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}