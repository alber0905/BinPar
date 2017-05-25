import React, {Component} from "react";
import {ScrollView, StyleSheet} from "react-native";
import I18n from "../lang/lang";
import Scene from "../components/Scene";
import CustomText from "../components/CustomText";
import {COLORS, STYLES, em} from "../utils/constants";
import Loading from "../components/Loading";

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'stretch',
		paddingVertical: 20,
		paddingHorizontal: 10
	},
	title: {
		fontSize: em(2),
		color: COLORS.MAIN_BLUE,
		fontWeight: '600'
	}
});

export default class SignUp extends Component {

	static route = {
		navigationBar: {
			backgroundColor: COLORS.WHITE,
			tintColor: COLORS.MAIN_BLUE,
			renderTitle: (route)=> { return <CustomText style={STYLES.navBarTitle}>{I18n.t('signup.create_account')}</CustomText>; }
		}
	};

	constructor(props) {
		super(props);
		this.state = { };
	}

	render() {
		return (
			<Scene>
				<ScrollView ref="containerScroll" contentContainerStyle={styles.content} >
					<CustomText style={styles.title}>{I18n.t('signup.scrollable_view')}</CustomText>
				</ScrollView>
				{ this.state.loading ? <Loading color={COLORS.WHITE} /> : null }
			</Scene>
		);
	}
}