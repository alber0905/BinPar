import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, Picker, Modal} from 'react-native';
import Dimensions from 'Dimensions';
import { COLORS, FONT_SIZES } from '../utils/constants';
import { BlurView } from 'react-native-blur';
import { NavigationStyles } from '@expo/ex-navigation';
import Button from './Button';
import CustomText from './CustomText';

const PickerItem = Picker.Item;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.TRANSPARENT,
		overflow: 'hidden'
	},
	mask: {
		flex: 1,
		backgroundColor: COLORS.TRANSPARENT
	},
	picker: {
		backgroundColor: COLORS.GREY_LIGHT_TRANS,
		position: 'absolute',
		bottom:0,
		left:0,
		right:0,
		height: 210,
		justifyContent: 'flex-start'
	},
	OKButton: {
		position: 'absolute',
		zIndex: 1,
		height: 25,
		backgroundColor: COLORS.TRANSPARENT,
		justifyContent: 'center',
		alignItems: 'flex-end',
		right: 0,
		left: 0,
		top: 0,
		paddingRight: 10
	},
	OKText: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.L
	}
});

export default class CollapsibleRoute extends Component {

	static route = {
		navigationBar: {
			visible: false
		},
		styles: {
			...NavigationStyles.SlideVertical,
			sceneAnimations: (props) => ({
				...NavigationStyles.SlideVertical.sceneAnimations(props),
				backgroundColor: COLORS.TRANSPARENT,
				shadowOpacity: 0
			})
		}
	};

	constructor(props) {
		super(props);
		let newVal = props.initialValue;
		if(newVal && typeof newVal === 'object') {
			newVal = props.initialValue.value;
		}
		this.state = {
			selectedValue: newVal,
			maxHeight: Dimensions.get('window').height
		};

		this.hide = this.hide.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}
	
	componentWillReceiveProps(newProps){
		if(this.props.initialValue !== newProps.initialValue && newProps.property !== this.props.property) {
			let newVal = newProps.initialValue;
			if(typeof newProps.initialValue === 'object') {
				newVal = newProps.initialValue.value;
			}
			this.setState({selectedValue: newVal});
		}
	}

	hide(){
		let itemValueKey = this.props.itemValueKey || 'value';
		let item = this.props.items.find((item)=>{
			return item[itemValueKey] === this.state.selectedValue;
		});
		this.props.onHide && this.props.onHide(item, this.props.property);
		this.props.navigator.pop();
	}

	onValueChange(newValue) {
		this.setState({ selectedValue: newValue }, () => {
			let itemValueKey = this.props.itemValueKey || 'value';
			let item = this.props.items.find((item)=>{
				return item[itemValueKey] === newValue;
			});
			this.props.onChangeValue && this.props.onChangeValue(item, this.props.property);
		});
	}

	render() {
		let itemValueKey = this.props.itemValueKey || 'value';
		return (
			<View style={styles.wrapper} >
				<Text style={styles.mask} onPress={this.hide}></Text>
				<BlurView style={styles.picker} blurType="xlight">
					<Button style={styles.OKButton} onPress={this.hide}>
						<CustomText style={styles.OKText}>OK</CustomText>
					</Button>
					<Picker selectedValue={this.state.selectedValue} onValueChange={this.onValueChange}>
						{this.props.items.map((item, i) => {
							return (
								<PickerItem key={i} value={item[itemValueKey]} label={item.toString()} />
							);
						})}
					</Picker>
				</BlurView>
			</View>
		);
	}
}