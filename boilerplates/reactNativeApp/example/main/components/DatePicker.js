import React, {Component} from 'react';
import {StyleSheet, Text, View, DatePickerIOS} from 'react-native';
import FormComponent from './FormComponent';
import CustomText from './CustomText';
import I18n from '../lang/lang';
import FakeSelect from './FakeSelect';
import {COLORS, FONT_SIZES} from '../utils/constants';
import moment from 'moment';

const styles = StyleSheet.create({
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

export default class DatePicker extends FormComponent {

	constructor(props) {
		super(props);
		this.state = {
			date: props.date
		};
		this.show = this.show.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.getValue = this.getValue.bind(this);
	}

	onDateChange(date, dontDispatchChange) {
		this.setState({date}, () => {
			this._updateValue(date, dontDispatchChange === true);
			if(this.props.collapsibleView) {
				this.show(true);
			}
		});
	}

	show(refresh) {
		let picker = (
			<DatePickerIOS
				date={this.state.date || new Date()}
				mode={this.props.mode || 'date'}
				timeZoneOffsetInMinutes={this.props.timeZoneInMinutes || new Date().getTimezoneOffset()}
				onDateChange={this.onDateChange}
			/>
		);
		if(this.props.collapsibleView) {
			if(refresh === true) {
				this.props.collapsibleView.refresh(picker);
			} else {
				this.props.collapsibleView.show(picker);
			}
		} else if(this.state.picker){
			this.setState({picker: null});
		} else if(!this.state.picker) {
			this.setState({picker});
		}
	}

	getValue() {
		return this.state.date;
	}

	setValue(newValue) {
		this.onDateChange(newValue, true);
	}

	render() {
		return (
			<View style={this.props.style}>
				<FakeSelect style={this.props.buttonStyle} onPress={this.show} textStyle={[(this.state.date ? {color: COLORS.DARK} : null), this.props.textStyle]} text={this.state.date ? moment(this.state.date).format('LL') : I18n.t('pick_a_date')} />
				{this.state.picker}
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}