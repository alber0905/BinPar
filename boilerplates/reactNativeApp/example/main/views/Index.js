import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import I18n from '../lang/lang';
import Scene from '../components/Scene';
import CustomText from '../components/CustomText';
import Button from '../components/Button';
import {COLORS, FONT_SIZES} from '../utils/constants';
import Separator from '../components/Separator';
import { Router } from '../index';

const styles = StyleSheet.create({
	logo: {
		flex: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	title: {
		fontFamily: 'Rotis Serif',
		color: COLORS.MAIN_BLUE
	},
	title_sec: {
		color: COLORS.MAIN_GREEN
	},
	subtitle: {
		marginTop: -10,
		color: COLORS.GREY
	},
	selector: {
		flex: 0.5,
		paddingLeft: 15,
		paddingRight: 15,
		justifyContent: 'space-around'
	},
	label: {
		color: COLORS.DARK,
		marginLeft: 10,
		marginBottom: 10,
		fontWeight: '600',
		fontSize: FONT_SIZES.XL
	},
	buttonText: {
		color: COLORS.WHITE,
		fontWeight: '500',
		fontSize: FONT_SIZES.XL
	},
	buttonStaff: {
		backgroundColor: COLORS.WHITE,
		borderColor: COLORS.MAIN_BLUE,
		borderWidth: 1
	}
});

export default class Index extends Component {

	static route = {
		navigationBar: {
			visible: false
		}
	};

	constructor(props) {
		super(props);

		this.state = {
			titleFont: 0,
			subtitleFont: 0
		};
		this.onLayout = this.onLayout.bind(this);
		this.goFindJob = this.goFindJob.bind(this);
		this.goFindHomeStaff = this.goFindHomeStaff.bind(this);
	}

	onLayout(e) {
		let viewWidth = e.nativeEvent.layout.width;
		let titleFont = viewWidth * 0.16;
		this.setState({titleFont: titleFont, subtitleFont: titleFont * 0.325});
	}

	goFindHomeStaff() {
		this.props.navigator.push(Router.getRoute('login', {title: 'find_professionals'}));
	}

	goFindJob() {
		this.props.navigator.push(Router.getRoute('login', {title: 'find_job'}));
	}

	render() {
		return (
			<Scene>
				<View style={styles.logo} onLayout={this.onLayout} >
					<Text style={[styles.title, {fontSize: this.state.titleFont}]}>familia<Text style={styles.title_sec}>facil</Text></Text>
					<Text style={[styles.subtitle, {fontSize: this.state.subtitleFont}]}>personal doméstico de confianza</Text>
				</View>
				<View style={styles.selector}>
					<View>
						<CustomText style={styles.label}>{I18n.t('looking_for_job')}</CustomText>
						<Button onPress={this.goFindJob}>
							<CustomText style={styles.buttonText}>{I18n.t('find_job')}</CustomText>
						</Button>
					</View>
					<Separator text={I18n.t('or')} />
					<View>
						<CustomText style={styles.label}>{I18n.t('need_hire_someone')}</CustomText>
						<Button style={styles.buttonStaff}  onPress={this.goFindHomeStaff}>
							<CustomText style={[styles.buttonText, {color: COLORS.MAIN_BLUE}]}>{I18n.t('find_home_staff')}</CustomText>
						</Button>
					</View>
				</View>
			</Scene>
		);
	}
}