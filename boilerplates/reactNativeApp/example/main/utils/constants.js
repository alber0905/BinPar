import Dimensions from "Dimensions";
import {StyleSheet} from "react-native";

export const COLORS = {
	WHITE: 'rgb(255, 255, 255)',
	WHITE_DARK: 'rgb(247, 249, 250)',
	MAIN_BLUE: 'rgb(0, 154, 221)',
	MAIN_BLUE_TRANS: 'rgba(0, 154, 221, 0.4)',
	DARK_BLUE: 'rgb(57, 81, 133)',
	FB_BLUE: 'rgb(57, 81, 133)',
	INNER_BUTTON_BLUE: 'rgb(73, 144, 226)',
	DARK: 'rgb(74, 74, 74)',
	GREY: 'rgb(109, 110, 112)',
	GREY_MEDIUM: 'rgb(155, 155, 155)',
	GREY_LIGHT: 'rgba(155, 155, 155, 0.4)',
	GREY_LIGHT_TRANS: 'rgba(155, 155, 155, 0.15)',
	GREY_LIGHT_NO_TRANS: 'rgb(227, 230, 232)',
	RED: 'rgb(208, 2, 27)',
	RED_TRANS: 'rgba(208, 2, 27, 0.2)',
	INNER_BUTTON_RED: 'rgb(254, 63, 53)',
	MAIN_GREEN: 'rgb(126, 211, 33)',
	GREEN_LIGHTER: 'rgb(174, 226, 120)',
	NOTIF_GREEN: 'rgb(78, 206, 0)',
	ORANGE: 'rgb(245, 166, 35)',
	TRANSPARENT: 'rgba(0,0,0,0)',
	WHATSAPP: 'rgb(14, 193, 67)',
	MESSENGER: 'rgb(5, 132, 255)',
	TWITTER: 'rgb(29, 161, 242)'
};

const {width, height} = Dimensions.get('window');
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;
export const OFFER_PUBLICATION_DAYS = 30;

const MAX_SCREEN_WIDTH_FOR_FONTS = 500;
export const FONT_SIZES = {
	XXXXXL: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 8) / 100,
	XXXXL: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 7) / 100,
	XXXL: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 6) / 100,
	XXL: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 5.5) / 100,
	XL: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 5) / 100,
	L: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 4.5) / 100,
	M: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 4) / 100,
	S: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 3.5) / 100,
	XS: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 3) / 100,
	XXS: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 2.5) / 100,
	XXXS: Math.round(Math.min(SCREEN_WIDTH, MAX_SCREEN_WIDTH_FOR_FONTS) * 1.5) / 100
};

export const STYLES = StyleSheet.create({
	navBarTitle: {
		fontSize: FONT_SIZES.XXL * 0.94,
		fontWeight: '500',
		textAlign: 'center',
		top: 5
	},
	flexHalf: {
		flex: 0.5
	},
	fontSizeXL: {
		fontSize: FONT_SIZES.XL
	},
	fontSizeL: {
		fontSize: FONT_SIZES.L
	},
	fontSizeM: {
		fontSize: FONT_SIZES.M
	},
	fontSizeS: {
		fontSize: FONT_SIZES.S
	},
	colorDark: {
		color: COLORS.DARK
	},
	noBorderRadiusTop: {
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0
	},
	marginBottom5: {
		marginBottom: 5
	},
	marginBottom10: {
		marginBottom: 10
	},
	marginBottom15: {
		marginBottom: 15
	},
	marginBottom20: {
		marginBottom: 20
	},
	marginTop15: {
		marginTop: 15
	},
	marginTop20: {
		marginTop: 20
	},
	marginLeft10: {
		marginLeft: 10
	},
	panelTitle: {
		color: COLORS.MAIN_BLUE,
		fontSize: FONT_SIZES.XL,
		fontWeight: '500',
		marginBottom: 5
	},
	noBorders: {
		borderTopWidth: 0,
		borderBottomWidth: 0,
		borderRightWidth: 0,
		borderLeftWidth: 0,
		borderWidth: 0,
	},
	noHorizontalPadding: {
		paddingHorizontal: 0
	}
});

export const PLAN_TYPES = {
	'3': 'company_access_plan',
	'10': 'social_sec_tramit',
	'12': 'candidate_report',
	'13': 'agency_service',
	'14': 'paysheets_monthly_service',
	'15': 'subscription_access_plan',
	'1': 'regular_access_plan'
};

export const EVENTS = {
	CHAT_ITEM: 'badge.chatItem::',
	NAV_BAR_SELECTOR: 'badge.navBarSelector::',
	OFFER_CARD: 'badge.offerCard::',
	CHAT_TAB: 'badge.chatTab::'
};
export const NAV_BAR_IDS = {
	CANDIDATE_VIEW_JOBS: 'candidate.viewJobs',
	FAMILY_MY_OFFERS: 'family.myOffers',
	FAMILY_OFFER_VIEW: 'family.offerView'
};

//MAGIC NUMBERS
export const MILLISECONDS_DAY = 86400000;

export const REMOVE_JUNK_REGEXP = /[\s\-_\.\(\)]/g;
export const VALID_INFO_REGEXP = /[0-9]{9}|arroba|@|facebook|www|https?:\/\//gi;

export const API_KEY = 'AIzaSyDZW7Gb5k6yTCjFNYQ8AhyE0vYSXWGD-08';
export const CUSTOM_MAP_STYLE = [
	{
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"elementType": "labels.icon",
		"stylers": [
			{
				"visibility": "off"
			}
		]
	},
	{
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"elementType": "labels.text.stroke",
		"stylers": [
			{
				"color": "#f5f5f5"
			}
		]
	},
	{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#bdbdbd"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#ffffff"
			}
		]
	},
	{
		"featureType": "road.arterial",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#757575"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#dadada"
			}
		]
	},
	{
		"featureType": "road.highway",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#616161"
			}
		]
	},
	{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	},
	{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#e5e5e5"
			}
		]
	},
	{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#eeeeee"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [
			{
				"color": "#c9c9c9"
			}
		]
	},
	{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [
			{
				"color": "#9e9e9e"
			}
		]
	}
];