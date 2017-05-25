import React, {Component} from 'react';

export default class FormComponent extends Component {

	constructor(props) {
		super(props);
		if(!props.exportDataKey) {
			throw new Error('You should pass a "exportDataKey" property');
		}
		this.state = {
			value: props.value || undefined,
			_valid: null,
			errorMessage: ''
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.formData !== this.props.formData) {
			this._updateValue(nextProps.formData[nextProps.exportDataKey]);
		}
	}

	componentWillUnmount() {
		this._unmounted = true;
	}

	_updateValue(newValue, dontDispatchChange) {
		if(this._unmounted) {
			return;
		}
		if(!this.props.formData) {
			throw new Error('You should pass a "formData" property');
		}
		if(!this.props.formData._updateValue) {
			throw new Error('The "formData" property should have a "_updateValue" function');
		}
		this.isValid(null, newValue);
		this.props.formData._updateValue(newValue, this.props.exportDataKey, !!dontDispatchChange);
	}

	getValue() {
		console.warn('I\'ts highly recommended to implement a "getValue" method that returns the actual value of the component');
		return this.state.value;
	}

	setValue(newValue) {
		console.warn('I\'ts highly recommended to implement a "setValue" method that set the actual value of the component to the new one');
		this.setState({ value: newValue });
	}

	isValid(dontUpdateState, overwriteValue) {
		let res = {valid: true, errorMessage: ''};
		let rules = this.props.validationRules;
		if(rules) {
			let data = this.props.formData;
			let value = overwriteValue || this.getValue();
			for (let i = 0, l = rules.length; i < l; i++) {
				let rule = rules[i];
				let validation = rule(value, data);
				if (!validation.OK) {
					res.valid = false;
					res.errorMessage = validation.error;
				}
			}
		}
		this.setState({_valid: res.valid, errorMessage: res.errorMessage});
		return res;
	}

	render() { throw new Error('You should implement a "render" method'); }
}