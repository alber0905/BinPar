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

// Calculating ratio from iPhone breakpoints
const RATIOX = width < 375 ? (width < 320 ? 0.75 : 0.875) : 1 ;
const RATIOY = height < 568 ? (height < 480 ? 0.75 : 0.875) : 1 ;

// We set our base font size value
const BASE_UNIT = 16;

// We're simulating EM by changing font size according to Ratio
const UNIT = BASE_UNIT * RATIOX;

// We add an em() shortcut function
export function em(value) {
	return UNIT * value;
}

//Esto es completamente opcional, se puede usar la función em directamente en los Styles, lo he dejado por retrocompatibilidad
export const FONT_SIZES = {
	XXXXXL: em(1.6),
	XXXXL: em(1.5),
	XXXL: em(1.4),
	XXL: em(1.3),
	XL: em(1.2),
	L: em(1.1),
	M: em(1),
	S: em(0.9),
	XS: em(0.8),
	XXS: em(0.7),
	XXXS: em(0.6),
	XXXXS: em(0.5),
	XXXXXS: em(0.4),
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

//MAGIC NUMBERS
export const MILLISECONDS_DAY = 86400000;

export const REMOVE_JUNK_REGEXP = /[\s\-_\.\(\)]/g;
export const VALID_INFO_REGEXP = /[0-9]{9}|arroba|@|facebook|www|https?:\/\//gi;