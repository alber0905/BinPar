import React from "react";
import {StyleSheet, View} from "react-native";
import CheckMarkElement from "./CheckMarkElement";
import BoxElement from "./BoxElement";
import FormComponent from "../FormComponent";
import CustomText from "../CustomText";
import {COLORS, FONT_SIZES} from "../../utils/constants";

const styles = StyleSheet.create({
	wrapper: {
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	wrapperHorizontal: {
		flexDirection: 'row',
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.MAIN_BLUE,
		overflow: 'hidden'
	},
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

export default class RadioButtons extends FormComponent {

	constructor(props) {
		super(props);
		if(!props.elements || !props.elements.length) {
			throw new Error('La propiedad "elements" es obligatoria. Debe ser un array de elementos con propiedades "value" y "label".');
		}
		this.state = {
			selected: props.selected
		};
	}

	selectThis(newValue, index, dontDispatchChange) {
		this.setState({ selected: index }, ()=>{
			this.props.onValueChange && this.props.onValueChange(newValue, this.props.exportDataKey);
			this._updateValue(newValue, dontDispatchChange === true);
		});
	}

	getValue() {
		return this.state.selected;
	}

	setValue(newValue) {
		let elements = this.props.elements;
		if(elements && elements.length) {
			let newIndex = elements.findIndex((element) => {
				return element.value === newValue;
			});
			this.selectThis(newValue, newIndex, true);
		} else {
			console.warn('There are no property elements or is empty. Maybe you should wait for the property to exist');
		}
	}

	render() {
		let boxDirection = this.props.boxDirection || 'horizontal';
		return (
			<View style={[styles.wrapper, this.props.style]}>
				<View style={(this.props.boxElements && boxDirection === 'horizontal' ? styles.wrapperHorizontal : null)}>
					{this.props.elements.map((element, i)=>{
						let label = element.label || element.value;
						let props = {
							key: `radio_b_${i}_${element.value}`,
							label,
							style: this.props.elementsStyle,
							onPress: this.selectThis.bind(this, element.value, i),
							isFirstElement: i === 0,
							selected: this.state.selected === i,
							textStyle: this.props.textStyle,
							direction: boxDirection
						};
						if(this.props.boxElements) {
							return (
								<BoxElement {...props} />
							);
						}
						else {
							return (
								<CheckMarkElement {...props} />
							);
						}
					})}
				</View>
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}