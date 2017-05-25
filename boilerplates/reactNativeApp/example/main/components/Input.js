import React, {PropTypes} from "react";
import {Animated, Platform, StyleSheet, TextInput, View} from "react-native";
import Validations from "../utils/validations";
import {COLORS, FONT_SIZES} from "../utils/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomText from "./CustomText";
import Button from "./Button";
import FormComponent from "./FormComponent";

const animProps = {
	label: {
		top: 15,
		left: 2.5,
		fontSize: FONT_SIZES.L,
		color: COLORS.MAIN_BLUE
	},
	labelActive: {
		top: 3,
		left: 2.5,
		fontSize: FONT_SIZES.XS,
		color: COLORS.MAIN_BLUE
	},
	labelWithText: {
		top: 3,
		left: 2.5,
		fontSize: FONT_SIZES.XS,
		color: COLORS.MAIN_BLUE
	},
	labelWithError: {
		color: COLORS.RED
	},
	basicInput: {
		marginBottom: 0
	},
	errorInput: {
		marginBottom: 15
	}
};

const styles = StyleSheet.create({
	wrapper: {
		marginBottom: 25
	},
	wrapperActive: {
		backgroundColor: COLORS.TRANSPARENT
	},
	basicInputWrapper:{
		marginTop: 12.5,
		borderBottomColor: COLORS.DARK,
		borderBottomWidth: 1
	},
	basicInput: {
		height: 25,
		paddingLeft: 2.5,
		color: COLORS.DARK,
		fontSize: FONT_SIZES.L,
		// fontFamily: 'WorkSans-Regular',
		fontWeight: '600'
	},
	label: {
		position: 'absolute',
		flexDirection: 'row',
		fontWeight: '500'
	},
	errorLabel: {
		position: 'relative',
		flexDirection: 'row',
		alignSelf: 'flex-start',
		color: COLORS.RED,
		top: 1,
		left: 2.5,
		fontSize: FONT_SIZES.XS,
		fontStyle: 'italic'
	},
	showPasswordButton: {
		position: 'absolute',
		top: -6,
		right: 7.5,
		backgroundColor: COLORS.TRANSPARENT,
		height: 30,
		width: 30,
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
export default class Input extends FormComponent {

	static propTypes = {
		type: PropTypes.oneOf(['text', 'email', 'number', 'phone', 'password']).isRequired,
		exportDataKey: PropTypes.string.isRequired,
		formData: PropTypes.object,
		placeholder: PropTypes.string,
		autoCorrect: PropTypes.bool,
		editable: PropTypes.bool,
		maxLength: PropTypes.number,
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

		this._labelTop = new Animated.Value(animProps.label.top);
		this._labelLeft = new Animated.Value(animProps.label.left);
		this._labelFontSize = new Animated.Value(animProps.label.fontSize);
		this._errorLabelOpacity = new Animated.Value(0);
		this.state = {
			value: props.formData[props.exportDataKey],
			_focused: false,
			_valid: null,
			labelColor: animProps.label.color,
			passwordIsVisible: true
		};
		this._os = Platform.OS;

		this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
		this._onFocus = this._onFocus.bind(this);
		this._onBlur = this._onBlur.bind(this);
		this.updateValue = this.updateValue.bind(this);
	}

	componentDidMount() {
		this._mounted = true;
	}

	componentWillUnmount() {
		this._mounted = false;
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
		let rules = this.props.validationRules || [];
		let data = this.props.formData;
		let value = overwriteValue || this.state.value;
		switch (this.props.type) {
			case 'text':

				break;
			case 'email':
				rules.push(Validations.isEmail);
				break;
			case 'password':
				rules.push(Validations.passwordAtLeastSixChars);
				break;
			case 'number':
				rules.push(Validations.isNumeric);
				break;
			case 'phone':
				rules.push(Validations.isPhone);
				break;
		}
		for (let i = 0, l = rules.length; i < l; i++) {
			let rule = rules[i];
			if (rule) {
				let validation = rule(value, data);
				if (!validation.OK) {
					res.valid = false;
					res.errorMessage = validation.error;
				}
			}
		}
		if(!dontUpdateState) {
			let newState = {_valid: res.valid};
			if(!res.valid) {
				newState.labelColor = animProps.labelWithError.color;
				newState.errorMessage = res.errorMessage;
				Animated.timing(this._errorLabelOpacity, {
					toValue: 1,
					duration: 10
				}).start(()=>{
					this._animateToFocusedInput();
				});
			}
			this.setState(newState);
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
				props.secureTextEntry = !this.state.passwordIsVisible;
				break;
			case 'number':
				props.keyboardType = 'numeric';
				break;
			case 'phone':
				props.keyboardType = 'phone-pad';
				if(!this.props.maxLength) {
					props.maxLength = 9;
				}
				break;
		}
		for(let i = 0, keys = Object.keys(this.props), l = keys.length; i < l; i++){
			let k = keys[i];
			if(k === 'placeholder' || k === 'style') continue;
			props[k] = this.props[k];
		}
		return props;
	}

	_animateToFocusedInput() {
		this._animationOnProgress = Animated.parallel([
			Animated.timing(this._labelTop, {
				toValue: animProps.labelActive.top,
				duration: 400
			}),
			Animated.timing(this._labelLeft, {
				toValue: animProps.labelActive.left,
				duration: 400
			}),
			Animated.timing(this._labelFontSize, {
				toValue: animProps.labelActive.fontSize,
				duration: 400
			})
		]).start(()=> {
			this._mounted && this.setState({labelColor: animProps.labelActive.color});
		});
	}

	_animateToNonFocusedInput() {
		this._animationOnProgress = Animated.parallel([
			Animated.timing(this._labelTop, {
				toValue: animProps.label.top,
				duration: 400
			}),
			Animated.timing(this._labelLeft, {
				toValue: animProps.label.left,
				duration: 400
			}),
			Animated.timing(this._labelFontSize, {
				toValue: animProps.label.fontSize,
				duration: 400
			})
		]).start(()=> {
			this._mounted && this.setState({labelColor: animProps.label.color});
		});
	}

	_onFocus() {
		this.setState({_focused: true});
		if(this._animationOnProgress && this._animationOnProgress.stop){
			this._animationOnProgress.stop();
		}
		if(this.state._valid === false && !this.state.value){
			this.setState({labelColor: animProps.labelWithError.color});
		}
		else if(this.state.value){
			this.setState({labelColor: animProps.labelActive.color});
		}
		else {
			this._animateToFocusedInput();
		}

		if(this.props.onCustomFocus){
			this.props.onCustomFocus();
		}
	}

	_onBlur(e) {
		let blurValue = e.nativeEvent.text;
		this.setState({_focused: false});
		let isValid = this.isValid(true, blurValue);
		if(this._animationOnProgress && this._animationOnProgress.stop){
			this._animationOnProgress.stop();
		}
		if(!isValid.valid){
			this.setState({
				labelColor: animProps.labelWithError.color,
				errorMessage: isValid.errorMessage,
				_valid: false
			});
			//anim to error
			this._animationOnProgress = Animated.timing(this._errorLabelOpacity, {
				toValue: 1,
				duration: 400
			}).start();
		}
		else {
			Animated.timing(this._errorLabelOpacity, {
				toValue: 0,
				duration: 400
			}).start(()=>{
				this._mounted && this.setState({_valid: true});
			});
			if(blurValue){
				this.setState({value: blurValue, labelColor: animProps.labelWithText.color}, () => {
					this._updateValue(blurValue, false);
				});
			}
			else {
				this._animateToNonFocusedInput();
			}
		}

		if(this.props.onCustomBlur){
			this.props.onCustomBlur(e);
		}
	}

	_refreshVisuals(newVal, cb){
		let val = newVal || this.state.value;
		let valid = this.isValid(true, val);
		if(this._animationOnProgress && this._animationOnProgress.stop){
			this._animationOnProgress.stop();
		}
		if(val){
			this._animationOnProgress = Animated.parallel([
				Animated.timing(this._labelTop, {
					toValue: animProps.labelActive.top,
					duration: 400
				}),
				Animated.timing(this._labelLeft, {
					toValue: animProps.labelActive.left,
					duration: 400
				}),
				Animated.timing(this._labelFontSize, {
					toValue: animProps.labelActive.fontSize,
					duration: 400
				})
			]).start(()=> {
				if(valid.valid) {
					this.setState({labelColor: animProps.labelWithText.color, _valid: true});
					Animated.timing(this._errorLabelOpacity, {
						toValue: 0,
						duration: 250
					}).start();
				}
				else{
					Animated.timing(this._errorLabelOpacity, {
						toValue: 1,
						duration: 250
					}).start();
					this.setState({labelColor: animProps.labelWithError.color, errorMessage: valid.errorMessage, _valid: false});
				}
				cb && cb.call(this);
			});
		}
		else if(valid.valid) {
			this._animationOnProgress = Animated.parallel([
				Animated.timing(this._labelTop, {
					toValue: animProps.label.top,
					duration: 400
				}),
				Animated.timing(this._labelLeft, {
					toValue: animProps.label.left,
					duration: 400
				}),
				Animated.timing(this._labelFontSize, {
					toValue: animProps.label.fontSize,
					duration: 400
				})
			]).start(()=> {
				Animated.timing(this._errorLabelOpacity, {
					toValue: 0,
					duration: 250
				}).start();
				this.setState({labelColor: animProps.label.color, _valid: true});
				cb && cb.call(this);
			});
		}
		else{
			Animated.timing(this._errorLabelOpacity, {
				toValue: 1,
				duration: 250
			}).start();
			this.setState({labelColor: animProps.labelWithError.color, errorMessage: valid.errorMessage, _valid: false});
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

	updateValue(t){
		this.setState({value: t});
	}

	togglePasswordVisibility() {
		this.setState({ passwordIsVisible: !this.state.passwordIsVisible });
	}

	render() {
		let props = this.getInputProps(this.props.type);
		let wrapperStyles = [styles.wrapper];
		let labelStyles = [styles.label, {top: this._labelTop, left: this._labelLeft, fontSize: this._labelFontSize, color: this.state.labelColor}];
		let inputStyles = [styles.basicInput];
		if(this.state._focused){
			wrapperStyles[1] = styles.wrapperActive;
		}
		wrapperStyles.push(this.props.style);
		return (
			<Animated.View ref="wrapper" style={wrapperStyles}>
				<CustomText animated={true} style={labelStyles}>{this.props.placeholder}</CustomText>
				<View style={styles.basicInputWrapper}>
					<TextInput style={inputStyles}
							   ref="input"
							   {...props}
							   underlineColorAndroid={COLORS.TRANSPARENT}
							   onFocus={this._onFocus}
							   onBlur={this._onBlur}
							   onChangeText={this.updateValue}
							   value={this.state.value} />
					{this.props.showPassword && this.state.value ? (
						<Button style={styles.showPasswordButton} onPress={this.togglePasswordVisibility}>
							<Icon name={this.state.passwordIsVisible ? 'eye-slash' : 'eye'} size={FONT_SIZES.XXXXL} color={COLORS.MAIN_BLUE} />
						</Button>
					) : null}
				</View>
				{(this.state._valid === false ? <CustomText animated={true} style={[styles.errorLabel, {opacity: this._errorLabelOpacity}]}>{this.state.errorMessage}</CustomText> : null)}
			</Animated.View>
		);
	}
}