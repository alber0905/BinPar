import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, FONT_SIZES} from '../utils/constants';
import Button from './Button';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import FormComponent from './FormComponent';

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'flex-start'
	},
	multiOptionsContainer: {
		justifyContent: 'center',
		alignItems: 'stretch',
		alignSelf: 'stretch',
		marginBottom: 10
	},
	addButton: {
		justifyContent: 'flex-start',
		alignSelf: 'stretch',
		backgroundColor: COLORS.TRANSPARENT,
		height: FONT_SIZES.XXXXL,
		flexDirection: 'row',
		marginLeft: 5,
		borderBottomColor: COLORS.GREY,
		borderBottomWidth: 1
	},
	addButtonIcon: {
		backgroundColor: COLORS.TRANSPARENT
	},
	addButtonText: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.L,
		fontWeight: '500',
		marginLeft: 10
	},
	element: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 10
	},
	elementButton: {
		justifyContent: 'center',
		backgroundColor: COLORS.TRANSPARENT,
		height: FONT_SIZES.XXXXL,
		marginLeft: 5,
		marginRight: 10
	},
	elementIcon: {
		backgroundColor: COLORS.TRANSPARENT
	},
	fakePadding: {
		marginLeft: 5,
		marginRight: 10,
		width: FONT_SIZES.XXXL,
		height: 1
	},
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

export default class MultiComboSelect extends FormComponent {

	constructor(props) {
		super(props);
		if(!props.renderItem) {
			throw new Error('El componente MultiComboSelect necesita una propiedad "renderItem" de tipo function');
		}
		let initialElements = props.initialElements || [];
		initialElements = initialElements.slice(0);
		let defaultElement = props.defaultElement || {};
		while(props.minCount && initialElements.length < props.minCount) {
			initialElements.push(defaultElement);
		}
		this.state = {
			elements: initialElements,
			defaultElement: defaultElement
		};
		this.addNewElement = this.addNewElement.bind(this);
		this.refresh = this.refresh.bind(this);
	}

	addNewElement() {
		this.state.elements.push(this.state.defaultElement);
		this.setState({elements: this.state.elements}, ()=>{
			this.props.onItemAdd && this.props.onItemAdd(this.state.defaultElement);
		});
	}

	removeElement(index) {
		this.state.elements.splice(index, 1);
		this.setState({elements: this.state.elements}, ()=>{
			this.props.onItemRemove && this.props.onItemRemove(index);
		});
	}

	getValue() {
		return this.state.elements;
	}

	setValue(newValue) {
		if(!(newValue instanceof Array)) {
			newValue = [newValue];
		}
		this.updateValue(newValue, true);
	}

	updateValue(newValue, dontDispatchChange) {
		this.setState({elements: newValue.slice(0)});
		this._updateValue(newValue, dontDispatchChange === true);
	}

	refresh(newValue) {
		this.forceUpdate();
		this._updateValue(newValue);
	}

	render() {
		let shouldRenderRemoveButton = !this.props.minCount || this.props.minCount < this.state.elements.length;
		return (
			<View style={styles.wrapper}>
				<View style={styles.multiOptionsContainer}>
					{this.state.elements.map((element, i)=>{
						return (
							<View key={`el_${i}`} style={styles.element}>
								{shouldRenderRemoveButton ? <Button style={styles.elementButton} onPress={this.removeElement.bind(this, i)}><Icon name="ios-remove-circle" size={FONT_SIZES.XXXXL} color={COLORS.RED} style={styles.elementIcon} /></Button> : <View style={styles.fakePadding}></View>}
								{this.props.renderItem(element, i)}
							</View>
						);
					})}
				</View>
				<Button style={styles.addButton} onPress={this.addNewElement}><Icon name="ios-add-circle" size={FONT_SIZES.XXXXL} color={COLORS.MAIN_GREEN} style={styles.addButtonIcon}/><CustomText style={styles.addButtonText}>{this.props.addButtonText}</CustomText></Button>
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}