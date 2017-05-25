import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HorizontalShadow from './HorizontalShadow';
import { COLORS } from '../utils/constants';
import Notification from './Notification';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: COLORS.WHITE_DARK
	}
});

export default class Scene extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.wrapper}>
				{React.Children.map(this.props.children, (child) => child)}
				{this.props.hideShadow ? null : (
					<HorizontalShadow top={0} />
				)}
				<Notification />
			</View>
		);
	}
}