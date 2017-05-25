/**
 * Created by marcosgonzalez on 15/6/16.
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, Animated, Platform, Picker} from 'react-native';
import Dimensions from 'Dimensions';
import {BlurView} from 'react-native-blur';

const PickerItem = Picker.Item;

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent',
		overflow: 'hidden'
	},
	mask: {
		position: 'absolute',
		bottom: 0,
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: 'transparent'
	},
	picker: {
		position: 'absolute',
		bottom:0,
		left:0,
		right:0,
		height: 210
	}
});

export default class CollapsiblePicker extends Component {

	constructor(props) {
		super(props);
		this._height = new Animated.Value(0);
		this.state = {
			selectedValue: this.props.initialValue,
			show: false,
			maxHeight: Dimensions.get('window').height
		};

		this.hide = this.hide.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}
	
	componentWillReceiveProps(newProps){
		if(this.props.initialValue !== newProps.initialValue && newProps.property !== this.props.property) {
			this.setState({selectedValue: newProps.initialValue});
		}
	}

	show(){
		if(!this.state.show && !this.state.animating){
			this.setState({animating: true});
			Animated.timing(this._height, {
				toValue: this.state.maxHeight,
				duration: 400
			}).start(()=>{this.setState({animating: false, show: true})});
		}
	}

	hide(){
		if(this.state.show && !this.state.animating){
			this.setState({animating: true});
			Animated.timing(this._height, {
				toValue: 0,
				duration: 400
			}).start(()=>{this.setState({animating: false, show: false}, ()=>{
				let itemValueKey = this.props.itemValueKey || 'value';
				let item = this.props.items.find((item)=>{
					return item[itemValueKey] === this.state.selectedValue;
				});
				this.props.onHide && this.props.onHide(item, this.props.property);
			})});
		}
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
			<Animated.View style={[styles.wrapper, {height: this._height}]} >
				<Text style={styles.mask} onPress={this.hide}></Text>
				<BlurView style={styles.picker} blurType="xlight">
					<Picker selectedValue={this.state.selectedValue} onValueChange={this.onValueChange}>
						{this.props.items.map((item, i) => {
							return (
								<PickerItem key={i} value={item[itemValueKey]} label={item.toString()} />
							);
						})}
					</Picker>
				</BlurView>
			</Animated.View>
		);
	}
}