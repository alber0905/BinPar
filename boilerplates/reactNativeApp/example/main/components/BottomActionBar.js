import React, {Component, PropTypes} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
	bar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'stretch',
		bottom: 0,
		height: 50
	},
	navBarButtonContainer:{
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'stretch',
		backgroundColor: 'transparent',
		height: 50
	},
	navBarButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	leftBarButton: {
		left: 15
	},
	rightBarButton: {
		right: 15
	},
	centerBarButton: {

	}
});

export default class BottomActionBar extends Component {

	static propTypes = {
		actionBarBackgroundColor: PropTypes.string,
		leftButton: PropTypes.object,
		rightButton: PropTypes.object,
		centerButton: PropTypes.object
	};
	
	static defaultProps = {
		actionBarBackgroundColor: '#ffffff'
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	_renderChilds(){
		let childs = [];
		let {leftButton, rightButton, centerButton} = this.props;
		childs.push((
			<View key="leftBtn" style={[styles.navBarButtonContainer, styles.leftBarButton]}>
				{(leftButton && React.isValidElement(leftButton.element)) ? ((!!leftButton.onPress) ? (
					<TouchableOpacity style={styles.navBarButton} onPress={leftButton.onPress}>
						{leftButton.element}
					</TouchableOpacity>
				) : leftButton.element) : null}
			</View>
		));
		childs.push((
			<View key="centerBtn" style={[styles.navBarButtonContainer, styles.centerBarButton]}>
				{(centerButton && React.isValidElement(centerButton.element)) ? ((!!centerButton.onPress) ? (
					<TouchableOpacity style={styles.navBarButton} onPress={centerButton.onPress}>
						{centerButton.element}
					</TouchableOpacity>
				) : centerButton.element) : null}
			</View>
		));
		childs.push((
			<View key="rightBtn" style={[styles.navBarButtonContainer, styles.rightBarButton]}>
				{(rightButton && React.isValidElement(rightButton.element)) ? ((!!rightButton.onPress) ? (
					<TouchableOpacity style={styles.navBarButton} onPress={rightButton.onPress}>
						{rightButton.element}
					</TouchableOpacity>
				) : rightButton.element) : null}
			</View>
		));
		return childs;
	}

	render() {
		return (
			<View style={[styles.bar, {backgroundColor: this.props.actionBarBackgroundColor}]}>
				{this._renderChilds()}
			</View>
		);
	}
}