import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, ScrollView, Keyboard, findNodeHandle} from 'react-native';
import FormComponent from './FormComponent';

const MIN_DIFF_OFFSET_TO_PREVENT_FOCUS = 100;

export default class Form extends Component {

	static propTypes = {
		onSubmit: PropTypes.func,
		children: PropTypes.any.isRequired
	};

	constructor(props) {
		super(props);
		let data = props.data || {};
		data._updateValue = this._updateValue.bind(this);
		this._keyboardDuration = 250;
		this.state = {
			_valid: null,
			_data: data,
			iOSreturnButton: 'next',
			keyboardAvoidPadding: null
		};

		this.modifyChilds = this.modifyChilds.bind(this);
		this.getElementByExportDataKey = this.getElementByExportDataKey.bind(this);
		this._handleKeyboardShow = this._handleKeyboardShow.bind(this);
		this._handleKeyboardHide = this._handleKeyboardHide.bind(this);
		this._handleScroll = this._handleScroll.bind(this);
	}

	componentDidMount() {
		if(!this.props.noScroll) {
			this._keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', this._handleKeyboardShow);
			this._keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', this._handleKeyboardHide);
		}
	}

	componentWillUnmount() {
		if(!this.props.noScroll) {
			this._keyboardWillShowSubscription && this._keyboardWillShowSubscription.remove();
			this._keyboardWillHideSubscription && this._keyboardWillHideSubscription.remove();
		}
	}

	_handleKeyboardShow(e) {
		this._keyboardDuration = e.duration;
		this.setState({keyboardAvoidPadding: e.endCoordinates.height});
	}

	_handleKeyboardHide() {
		this.setState({keyboardAvoidPadding: null});
	}

	scrollToElement(element, offset) {
		if(typeof element === 'string') {
			element = this.getElementByExportDataKey(element);
		}
		!this.props.noScroll && setTimeout(()=>{
			let scrollResponder = this.refs.scrollView.getScrollResponder();
			scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
				findNodeHandle(element),
				offset || 150, //additionalOffset
				true
			);
		}, 50);
	}

	_handleScroll(e) {
		let yOffset = e.nativeEvent.contentOffset.y;
		if(this._elementInitialYOffset != null) {
			let offsetDiff = Math.abs(yOffset - this._elementInitialYOffset);
			this._preventInputFocus = offsetDiff > MIN_DIFF_OFFSET_TO_PREVENT_FOCUS;
		} else if(this._elementInitialYOffset === true) {
			this._elementInitialYOffset = yOffset;
		}
	}

	_inputFocus(refName) {
		if(this._preventInputFocus) {
			this._elementInitialYOffset = null;
			this._preventInputFocus = false;
			return;
		}
		if(this._elementInitialYOffset == null) {
			this._elementInitialYOffset = true;
		}
		!this.props.noScroll && setTimeout(()=>{
			if(this.refs[refName]) {
				let scrollResponder = this.refs.scrollView.getScrollResponder();
				scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
					findNodeHandle(this.refs[refName]),
					150, //additionalOffset
					true
				);
			}
		}, this._keyboardDuration);
	}

	_updateValue(newVal, key, dontDispatchChange) {
		let data = this.state._data;
		if(typeof newVal !== 'string' || newVal !== data[key]) {
			data[key] = newVal;
			this.setState({_data: data}, () => {
				!dontDispatchChange && this.props.onValueChange && this.props.onValueChange(key, newVal);
			});
		}
	}

	fillForm(data) {
		Object.keys(data).forEach((key) => {
			let el = this.getElementByExportDataKey(key);
			el && el.setValue && el.setValue(data[key]);
		});
	}

	getElementByExportDataKey(exportDataKey) {
		let refKeys = Object.keys(this.refs);
		for (let i = 0, l = refKeys.length; i < l; i++) {
			let refKey = refKeys[i];
			let element = this.refs[refKey];
			if(element.props.exportDataKey === exportDataKey) {
				return element;
			}
		}
	}

	_getChildsErrors(){
		let childrenKeys = Object.keys(this.refs);
		let errorComponent = null;
		let errorCount = 0;
		for(let i = 0, l = childrenKeys.length; i < l && (this.props.recursive || errorCount < 2); i++){
			let child = this.refs[childrenKeys[i]];
			if(child.isValid) {
				let valid = child.isValid(!this.props.recursive).valid;
				if (!child || !valid) {
					errorCount++;
					if (!errorComponent) {
						errorComponent = child;
					}
				}
			}
		}
		return {
			errorComponent: errorComponent,
			errorCount: errorCount
		}
	}

	_goToNextOrSubmit(){
		let {errorComponent, errorCount} = this._getChildsErrors();

		if(errorCount > 1){
			this.setState({iOSreturnButton: 'next'});
		}
		else{
			this.setState({iOSreturnButton: 'send'});
		}

		if(errorComponent && errorCount > 0){
			if(errorComponent.focus) {
				setTimeout(errorComponent.focus.bind(errorComponent), 0);
			} else if(errorComponent.props && errorComponent.props.visibleKey) {
				this._inputFocus(errorComponent.props.visibleKey);
			}
		}
		else {
			this.submit();
		}
	}

	goToNextOrSubmit(){
		if(this._goToNextOrSubmitTimer) {
			clearTimeout(this._goToNextOrSubmitTimer);
			this._goToNextOrSubmitTimer = null;
		}
		this._goToNextOrSubmitTimer = setTimeout(this._goToNextOrSubmit.bind(this),100);
	}

	componentWillReceiveProps(nextProps){
		if(this.props.children.length !== nextProps.children.length){
			this.goToNextOrSubmit();
		}
	}

	getFormData(){
		return this.state._data || {};
	}

	_cleanForm(keys){
		let newData = this.state._data;
		if(keys == null || keys.length === 0){
			//clean all
			keys = Object.keys(newData);
			for(let i = 0, l = keys.length; i < l; i++){
				let key = keys[i];
				newData[key] = null;
			}
		}
		else{
			//only clean keys
			for(let i = 0, l = keys.length; i < l; i++){
				let key = keys[i];
				newData[key] = null;
			}
		}
		this.setState({_data: newData});
	}

	submit(){
		if(this.props.onSubmit){
			this.props.onSubmit(this.state._data, this._cleanForm.bind(this));
		}
	}

	modifyChilds(newChilds, children, parent) {
		let newChild = {};
		React.Children.forEach(children, (child, i) => {
			if(child && child.props) {
				if(child.type && child.type.prototype instanceof FormComponent) {
					let key = `${child.props.exportDataKey}_${i}`;
					newChild = React.cloneElement(child, {
						key,
						ref: key,
						visibleKey: key,
						formData: this.state._data,
						returnKeyType: this.state.iOSreturnButton,
						onCustomSubmitEditing: this.goToNextOrSubmit.bind(this),
						onCustomFocus: this._inputFocus.bind(this, key),
						onCustomBlur: this._inputFocus.bind(this, key, 400)
					});
				} else if(child.props.children && typeof child.props.children !== 'string') {
					let newChildsOfChild = [];
					newChild = React.cloneElement(child, {children: newChildsOfChild});
					this.modifyChilds(newChildsOfChild, child.props.children, child);
				} else {
					newChild = child;
				}
			} else {
				newChild = child;
			}
			newChilds.push(newChild);
		});
	}
	
	renderChilds() {
		if(this.props.recursive) {
			let newChilds = [];
			this.modifyChilds(newChilds, this.props.children);
			//React.Children.map to avoid Warning: Component's children should not be mutated.
			return React.Children.map(newChilds, (child)=>{
				return child;
			});
		}
		else {
			let i = 0;
			return React.Children.map(this.props.children, (child)=> {
				if (!child || (child.props && (child.props.isVisible === false || (child.props.isVisible instanceof Function && child.props.isVisible(this.state._data, i) === false)))) {
					return null;
				}
				let key = 'child-' + (i++);
				return React.cloneElement(child, {
					key,
					ref: key,
					visibleKey: key,
					formData: this.state._data,
					returnKeyType: this.state.iOSreturnButton,
					onCustomSubmitEditing: this.goToNextOrSubmit.bind(this),
					onCustomFocus: this._inputFocus.bind(this, key),
					onCustomBlur: this._inputFocus.bind(this, key)
				});
			});
		}
	}

	getRenderView() {
		if(this.props.noScroll){
			return (
				<View style={this.props.style}>
					{this.renderChilds()}
				</View>
			);
		}
		else{
			return (
				<ScrollView style={this.props.style} contentContainerStyle={[this.props.contentContainerStyle, {paddingBottom: this.state.keyboardAvoidPadding}]} ref="scrollView" scrollEventThrottle={100} onScroll={this._handleScroll}>
					{this.renderChilds()}
				</ScrollView>
			);
		}
	}

	render() {
		return this.getRenderView();
	}
}