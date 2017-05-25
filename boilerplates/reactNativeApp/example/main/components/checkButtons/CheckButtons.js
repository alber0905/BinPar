import React, {Component} from 'react';
import {StyleSheet, View, Switch} from 'react-native';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import CustomText from '../CustomText';
import FormComponent from '../FormComponent';
import { CheckItemNoForm } from './CheckItem';

const styles = StyleSheet.create({
	wrapper: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	firstElement: {
		borderTopColor: COLORS.GREY_LIGHT,
		borderTopWidth: 1
	},
	groupWrapper: {
		marginBottom: 15
	},
	groupTitle: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.L,
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

export default class CheckButtons extends FormComponent {

	constructor(props) {
		super(props);
		if(!props.elements || !props.elements.length) {
			throw new Error('La propiedad "elements" es obligatoria. Debe ser un array de elementos con propiedades "value" y "label".');
		}
		this.state = {
			values: props.elements.map((element)=>{
				if(element.group instanceof Array) {
					return element.group;
				} else {
					return {
						value: element.value,
						checked: !!element.checked
					};
				}
			})
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.elements.length !== this.props.elements.length) {
			this.setState({
				values: nextProps.elements.map((element)=>{
					if(element.group instanceof Array) {
						return element.group;
					} else {
						return {
							value: element.value,
							checked: !!element.checked
						};
					}
				})
			});
		}
	}

	getValue() {
		return this.state.values;
	}

	setValue(newValues) {
		if(newValues instanceof Array) {
			let values = this.props.elements.map((el) => {
				if(el.group instanceof Array) {
					return el.group.map((innerEl) => {
						return {
							value: innerEl.value,
							checked: newValues.some((id) => {
								return (innerEl.value + '') === (id + '');
							})
						};
					});
				} else {
					return {
						value: el.value,
						checked: newValues.some((id) => {
							return (el.value + '') === (id + '');
						})
					};
				}
			});
			this.setState({ values }, () => {
				this._updateValue(values, true);
			});
		} else {
			throw new Error('[CheckButtons] setValue must receive an array of { index, checked } values');
		}
	}

	toggleThis(index, newValue) {
		this.state.values[index].checked = !this.state.values[index].checked;
		this.setState({values: this.state.values}, ()=>{
			this.props.onValueChange && this.props.onValueChange(this.state.values, index);
			this._updateValue(this.state.values);
		});
	}

	toggleThisGroup(i, j, newValue) {
		this.state.values[i][j].checked = !this.state.values[i][j].checked;
		this.setState({ values: this.state.values }, () => {
			this.props.onValueChange && this.props.onValueChange(this.state.values, i, j);
			this._updateValue(this.state.values);
		});
	}

	render() {
		return (
			<View style={[styles.wrapper, this.props.style]}>
				{this.props.elements.map((element, i) => {
					if(element.group instanceof Array) {
						return (
							<View key={`c_w_${i}`} style={styles.groupWrapper}>
								<CustomText style={styles.groupTitle}>{element.title}</CustomText>
								{element.group.map((innerElement, j) => {
									return (
										<CheckItemNoForm key={`check_b_${i}_${j}_${innerElement.value}`}
													 style={(j === 0 ? styles.firstElement : null)}
													 label={innerElement.label || innerElement.value} value={this.state.values[i][j].checked}
													 onValueChange={this.toggleThisGroup.bind(this, i, j)}/>
									);
								})}
							</View>
						);
					} else {
						return (
							<CheckItemNoForm key={`check_b_${i}_${element.value}`}
											 style={(i === 0 ? styles.firstElement : null)}
											 label={element.label || element.value} value={this.state.values[i].checked}
											 onValueChange={this.toggleThis.bind(this, i)}/>
						);
					}
				})}
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}