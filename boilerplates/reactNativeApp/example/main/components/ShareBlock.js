import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import I18n from '../lang/lang';
import {COLORS, FONT_SIZES, STYLES} from '../utils/constants';
import CustomText from './CustomText';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons'
import Share from 'react-native-share';

const SHARE_BUTTONS_SIZE = 50;
const ICON_SIZE = SHARE_BUTTONS_SIZE * 0.65;
const styles = StyleSheet.create({
	wrapper: {
		backgroundColor: COLORS.GREY_LIGHT_TRANS,
		paddingVertical: 10,
		paddingHorizontal: 5
	},
	titleText: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.L,
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 10
	},
	iconsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	shareBlock: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	shareLabels: {
		color: COLORS.DARK,
		marginTop: 2.5,
		fontSize: FONT_SIZES.S
	},
	roundButton: {
		backgroundColor: COLORS.TRANSPARENT,
		width: SHARE_BUTTONS_SIZE,
		height: SHARE_BUTTONS_SIZE,
		borderRadius: SHARE_BUTTONS_SIZE * 0.5,
		justifyContent: 'center',
		alignItems: 'stretch'
	},
	shareButtons: {
		backgroundColor: COLORS.TRANSPARENT,
		textAlign: 'center'
	},
	whatsAppButton: {
		backgroundColor: COLORS.WHATSAPP
	},
	twitterButton: {
		backgroundColor: COLORS.TWITTER
	},
	facebookButton: {
		backgroundColor: COLORS.FB_BLUE
	},
	allButton: {
		backgroundColor: COLORS.WHITE
	}
});

export default class ShareBlock extends Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	share(social) {
		let shareOptions = {
			title: I18n.t('look_this_job'),
			message: 'Quiero compartir este trabajo contigo',
			url: 'https://familiafacil.es/ofertas-trabajo',
			subject: 'Mira esta oferta de FamiliaFacil'
		};
		let promise = null;
		if(social === 'all') {
			promise = Share.open(shareOptions);
		} else {
			promise = Share.shareSingle(Object.assign(shareOptions, {social}));
		}
		if(promise) {
			promise.then((res)=>{
				console.log(res);
			}).catch((err)=>{
				console.log('[ShareBlock - share]', err);
				if(err.error.message) {
					Alert.alert('', err.error.message);
				}
			});
		}
	}

	render() {
		return (
			<View style={[styles.wrapper, this.props.style]}>
				<CustomText style={styles.titleText}>{this.props.title}</CustomText>
				<View style={styles.iconsWrapper}>
					<View style={styles.shareBlock}>
						<Button style={[styles.roundButton, styles.twitterButton]} onPress={this.share.bind(this, 'twitter')}>
							<Icon style={styles.shareButtons} name="twitter" size={ICON_SIZE} color={COLORS.WHITE} />
						</Button>
						<CustomText style={styles.shareLabels}>Twitter</CustomText>
					</View>
					<View style={styles.shareBlock}>
						<Button style={[styles.roundButton, styles.facebookButton]} onPress={this.share.bind(this, 'facebook')}>
							<Icon style={styles.shareButtons} name="facebook" size={ICON_SIZE} color={COLORS.WHITE} />
						</Button>
						<CustomText style={styles.shareLabels}>Facebook</CustomText>
					</View>
					<View style={styles.shareBlock}>
						<Button style={[styles.roundButton, styles.allButton]} onPress={this.share.bind(this, 'all')}>
							<Ionicon style={styles.shareButtons} name="ios-more" size={ICON_SIZE} color={COLORS.DARK} />
						</Button>
						<CustomText style={styles.shareLabels}>{I18n.t('more')}</CustomText>
					</View>
				</View>
			</View>
		);
	}
}