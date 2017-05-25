import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Loading from './Loading';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	wrapper: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: COLORS.MAIN_BLUE,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		color: COLORS.WHITE,
	},
	subtitle: {
		marginTop: -10,
		color: COLORS.WHITE,
	},
	loading: {
		alignSelf: 'stretch',
		backgroundColor: COLORS.TRANSPARENT,
		left: 0,
		right: 0,
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		zIndex: null,
		top: null,
		bottom: null
	}
});

export default class SplashScreen extends Component {

	constructor(props) {
		super(props);

		this.state = {
			titleFont: 0,
			subtitleFont: 0
		};
		this.onLayout = this.onLayout.bind(this);
	}

	componentWillUnmount() {
		this._unmounted = true;
	}

	onLayout(e) {
		if(this._unmounted) {
			return;
		}
		let viewWidth = e.nativeEvent.layout.width;
		let titleFont = viewWidth * 0.12;
		this.setState({titleFont: titleFont, subtitleFont: titleFont * 0.425});
	}

	render() {
		return (
			<View style={styles.wrapper} onLayout={this.onLayout} >
				<Text style={[styles.title, {fontSize: this.state.titleFont}]}>SplashScreen</Text>
				<Text style={[styles.subtitle, {fontSize: this.state.subtitleFont}]}>splash subtitle or something</Text>
				<Loading viewStyle={styles.loading} color={COLORS.WHITE} size="small"/>
			</View>
		);
	}
}