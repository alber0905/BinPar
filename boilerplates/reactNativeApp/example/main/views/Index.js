import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../lang/lang';
import Scene from '../components/Scene';
import CustomText from '../components/CustomText';
import Button from '../components/Button';
import {COLORS, em} from '../utils/constants';
import { Router } from '../index';
import Panel from "../components/Panel";

const BUTTON_HEIGHT = em(2);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'stretch',
		paddingHorizontal: 10,
		paddingVertical: 20
	},
	title: {
		color: COLORS.MAIN_BLUE,
		fontSize: em(1.5),
		marginBottom: 10
	},
	intro: {
		color: COLORS.DARK,
		fontSize: em(1)
	},
	buttonGroup: {
		position: 'absolute',
		bottom: 40,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'stretch'
	},
	buttonLogin: {
		height: BUTTON_HEIGHT,
		paddingHorizontal: 10,
		backgroundColor: COLORS.TRANSPARENT,
		borderRadius: 10,
		borderColor: COLORS.MAIN_BLUE,
		borderWidth: 2
	},
	buttonLoginText: {
		color: COLORS.MAIN_BLUE,
		fontSize: em(1),
		fontWeight: '500'
	},
	buttonSignUp: {
		height: BUTTON_HEIGHT,
		backgroundColor: COLORS.TRANSPARENT,
		borderRadius: null,
		borderWidth: 0
	},
	buttonSignUpText: {
		color: COLORS.DARK,
		fontSize: em(0.85),
		fontWeight: '400'
	}
});

export default class Index extends Component {

	static route = {
		navigationBar: {
			backgroundColor: COLORS.WHITE,
			title: 'Título navBar',
			tintColor: COLORS.DARK
		}
	};

	constructor(props) {
		super(props);

		this.state = { };

		this.goLogin = this.goLogin.bind(this);
		this.goSingUp = this.goSingUp.bind(this);
	}

	goLogin() {
		this.props.navigator.push(Router.getRoute('login'));
	}

	goSingUp() {
		this.props.navigator.push(Router.getRoute('signUp'));
	}

	render() {
		return (
			<Scene>
				<View style={styles.container}>
					<Panel>
						<CustomText style={styles.title}>{I18n.t('index.title')}</CustomText>
						<CustomText style={styles.intro}>{I18n.t('index.intro')}</CustomText>
					</Panel>
					<View style={styles.buttonGroup}>
						<Button style={styles.buttonLogin} onPress={this.goLogin}>
							<CustomText style={styles.buttonLoginText}>{I18n.t('index.login')}</CustomText>
						</Button>
						<Button style={styles.buttonSignUp} onPress={this.goSingUp}>
							<CustomText style={styles.buttonSignUpText}>{I18n.t('index.signup')}</CustomText>
						</Button>
					</View>
				</View>
			</Scene>
		);
	}
}