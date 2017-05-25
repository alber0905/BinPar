/**
 * Created by marcosgonzalez on 13/5/16.
 */
import React, {Component, PropTypes} from 'react';
import {StyleSheet, TextInput, View, Platform, findNodeHandle, DeviceEventEmitter} from 'react-native';
import Validations from '../utils/validations';
import {COLORS, FONT_SIZES} from '../utils/constants';
import CustomText from './CustomText';
import FormComponent from './FormComponent';

const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: COLORS.TRANSPARENT,
		marginBottom: 10
	},
	basicInputWrapper:{
		marginTop: 12.5,
		borderBottomColor: COLORS.DARK,
		borderBottomWidth: 1
	},
	basicInput: {
		height: 25,
		paddingLeft: 2.5,
		//fontFamily: 'WorkSans-Regular',
		color: COLORS.DARK
	},
	icon: {
		position: 'absolute',
		flexDirection: 'row',
		top: 15,
		left: 2.5
	},
	label: {
		position: 'absolute',
		flexDirection: 'row',
		fontWeight: '500',
		top: 15,
		left: 2.5,
		fontSize: FONT_SIZES.M,
		color: COLORS.MAIN_BLUE
	},
	errorLabel: {
		position: 'relative',
		flexDirection: 'row',
		alignSelf: 'flex-start',
		color: COLORS.RED,
		top: 1,
		left: 2.5,
		fontSize: FONT_SIZES.XXS,
		fontStyle: 'italic'
	}
});

/**
 * @component: Input
 * @props:
 * 	type: String - Tipo del campo [text, email, number, password, phone]
 * 	exportDataKey: String - Nombre que tendrá la propiedad al exportarse en FormData
 * 	placeholder: String - Texto de descripción del campo
 * 	autoCorrect: Bool - Autocorrector activado o desactivado. Por defecto depende del "type"
 * 	editable: Bool - Define si el campo es editable o no
 * 	maxLength: Number - Número máximo de caracteres del campo
 * 	multiline: Bool - Define si el campo permite múltiples líneas
 * 	onCustomFocus: Function - función que se ejecutará al recibir el foco el campo
 * 	onCustomBlur: Function - función que se ejecutará al perder el foco el campo
 * 	onCustomSubmitEditing: Function - función que se ejecuta cuando es pulsado el botón de return del teclado
 * 	selectTextOnFocus: Bool - define si se seleccionará el texto al recibir el foco el campo
 * 	enablesReturnKeyAutomatically: Bool - [SOLO iOS] Si el campo está vacío el botón de return se desactiva
 * 	clearTextOnFocus: Bool - [SOLO iOS] Define si el campo borrará el texto al recibir el foco
 * 	returnKeyType: String - [SOLO iOS] Determina cómo se verá el botón de return ['default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call']
 * 	scrollResponder: Object - Controlador de un scrollView para ser usado en el onFocus y hacer scroll al input
 */
export default class SimpleInput extends FormComponent {

	static propTypes = {
		type: PropTypes.oneOf(['text', 'email', 'number', 'phone', 'password']).isRequired,
		exportDataKey: PropTypes.string.isRequired,
		formData: PropTypes.object,
		autoCorrect: PropTypes.bool,
		editable: PropTypes.bool,
		maxLength: PropTypes.number,
		icon: PropTypes.element,
		multiline: PropTypes.bool,
		validationRules: PropTypes.array,
		onCustomBlur: PropTypes.func,
		onCustomChange: PropTypes.func,
		onCustomChangeText: PropTypes.func,
		onCustomEndEditing: PropTypes.func,
		onCustomFocus: PropTypes.func,
		onCustomLayout: PropTypes.func,
		onCustomSelectionChange: PropTypes.func,
		onCustomSubmitEditing: PropTypes.func,
		placeholderTextColor: PropTypes.string,
		selectTextOnFocus: PropTypes.bool,
		enablesReturnKeyAutomatically: PropTypes.bool,
		clearTextOnFocus: PropTypes.bool,
		returnKeyType: PropTypes.oneOf(['default', 'go', 'google', 'join', 'next', 'route', 'search', 'send', 'yahoo', 'done', 'emergency-call']),
		scrollResponder: PropTypes.any
	};

	static defaultProps = {
		type: 'text'
	};

	constructor(props) {
		super(props);
		this.state = {
			value: props.formData[props.exportDataKey],
			_focused: false,
			_valid: null
		};
		this._os = Platform.OS;
	}

	setValue(newVal){
		newVal = newVal + '';
		this.refreshVisuals(newVal, () => {
			this.setState({value: newVal}, () => {
				this._updateValue(newVal, true);
				this.isValid();
			});
		});
	}

	getValue(){
		return this.state.value;
	}

	clearInput(){
		return this.refs.input.clear();
	}

	isFocused(){
		return this.refs.input.isFocused();
	}

	focus(){
		this.refs.input.focus();
	}

	getFormData(){
		return {
			key: this.props.exportDataKey,
			value: this.getValue()
		}
	}

	isValid(dontUpdateState, overwriteValue) {
		let res = {valid: true, errorMessage: ''};
		let rules = this.props.validationRules;
		let data = this.props.formData;
		let value = overwriteValue || this.state.value;
		switch(this.props.type){
			case 'text':

				break;
			case 'email':
				rules.push(Validations.isEmail);
				break;
			case 'password':

				break;
			case 'number':
				rules.push(Validations.isNumeric);
				break;
			case 'phone':
				rules.push(Validations.isPhone);
				break;
		}
		if(rules) {
			for (let i = 0, l = rules.length; i < l; i++) {
				let rule = rules[i];
				let validation = rule(value, data);
				if (!validation.OK) {
					res.valid = false;
					res.errorMessage = validation.error;
				}
			}
		}
		if (!dontUpdateState) {
			this.setState({_valid: res.valid});
		}
		return res;
	}

	getInputProps(type){
		let props = {
			autoCorrect: false,
			autoCapitalize: 'none'
		};
		if(this._os === 'ios'){
			props.clearButtonMode = 'while-editing';

		}
		else{
			delete props.returnKeyType;
		}
		if(this.props.onCustomSubmitEditing && this.props.onCustomSubmitEditing instanceof Function){
			props.onSubmitEditing = ()=>{
				this.props.onCustomSubmitEditing(this);
			};
		}
		switch(type){
			case 'text':
				props.autoCapitalize = 'sentences';
				props.autoCorrect = true;
				props.keyboardType = 'default';
				break;
			case 'email':
				props.keyboardType = 'email-address';
				break;
			case 'password':
				props.keyboardType = 'default';
				props.secureTextEntry = true;
				break;
			case 'number':
				props.keyboardType = 'numeric';
				break;
			case 'phone':
				props.keyboardType = 'phone-pad';
				break;
		}
		for(let i = 0, keys = Object.keys(this.props), l = keys.length; i < l; i++){
			let k = keys[i];
			if(k === 'placeholder') continue;
			props[k] = this.props[k];
		}
		return props;
	}

	_onFocus() {
		this.setState({_focused: true});

		if(this.props.onCustomFocus){
			this.props.onCustomFocus();
		}
	}

	_onBlur() {
		this.setState({_focused: false});
		let isValid = this.isValid(true);
		if(!isValid.valid){
			this.setState({
				errorMessage: isValid.errorMessage,
				_valid: false
			});
		}
		else {
			this.setState({_valid: true});
		}

		if(this.props.onCustomBlur){
			this.props.onCustomBlur();
		}
	}

	_refreshVisuals(newVal, cb){
		let val = newVal || this.state.value;
		let valid = this.isValid(true, val);
		if(val){
			if(valid.valid) {
				this.setState({_valid: true});
			}
			else{
				this.setState({errorMessage: valid.errorMessage, _valid: false});
			}
			cb && cb.call(this);
		}
		else if(valid.valid) {
			this.setState({_valid: true});
			cb && cb.call(this);
		}
		else{
			this.setState({errorMessage: valid.errorMessage, _valid: false});
			cb && cb.call(this);
		}
	}

	refreshVisuals(newVal, cb){
		if(this._refreshVisualsTimer){
			clearTimeout(this._refreshVisualsTimer);
			this._refreshVisualsTimer = null;
		}
		this._refreshVisualsTimer = setTimeout(this._refreshVisuals.bind(this, newVal, cb),100);
	}

	componentWillReceiveProps(nextProp) {
		let newVal = nextProp.formData[nextProp.exportDataKey];
		if(!this.refs.input.isFocused() && newVal !== null && newVal !== this.state.value){
			this.refreshVisuals(newVal, ()=>{ this.setState({value: newVal}); });
		}
	}

	updateValue(t){
		this.setState({value: t});
		if(this._updateValueTimer){
			clearTimeout(this._updateValueTimer);
			this._updateValueTimer = null;
		}
		this._updateValueTimer = setTimeout(this._updateValue.bind(this,t), 100);
	}

	render() {
		let props = this.getInputProps(this.props.type);
		return (
			<View ref="wrapper" style={[styles.wrapper, this.props.style]}>
				{this.props.icon ? <View style={styles.icon}>{this.props.icon}</View> : null}
				{this.state._focused || this.state.value ? null : <CustomText style={[styles.label, this.props.labelStyle, (this.state._valid === false ? {color: COLORS.RED} : null), (this.props.icon ? {left: this.props.iconPadding || 20} : null)]}>{this.props.placeholder}</CustomText>}
				<View style={[styles.basicInputWrapper, this.props.inputWrapperStyle]}>
					<TextInput style={[styles.basicInput, this.props.icon ? {paddingLeft: this.props.iconPadding || 20} : null, this.props.inputStyle]}
							   ref="input"
							   {...props}
							   underlineColorAndroid={COLORS.TRANSPARENT}
							   onFocus={this._onFocus.bind(this)}
							   onBlur={this._onBlur.bind(this)}
							   onChangeText={this.updateValue.bind(this)}
							   value={this.state.value} />
				</View>
				{(!this.props.dontShowError && this.state._valid === false ? <CustomText style={styles.errorLabel}>{this.state.errorMessage}</CustomText> : null)}
			</View>
		);
	}
}