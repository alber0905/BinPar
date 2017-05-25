import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import I18n from '../../lang/lang';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from '../CustomText';
import Loading from '../Loading';

const ICON_SIZE = FONT_SIZES.XXXXXL * 2;
const ICON_MAIN_SIZE = FONT_SIZES.XXXXXL * 3;
const IMAGE_SQUARE_SIZE = 80;

const styles = StyleSheet.create({
	imageFrame: {
		height: IMAGE_SQUARE_SIZE,
		width: IMAGE_SQUARE_SIZE,
		backgroundColor: COLORS.GREY_LIGHT,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 5,
		marginLeft: 5
	},
	image: {
		height: IMAGE_SQUARE_SIZE,
		width: IMAGE_SQUARE_SIZE
	},
	icon: {
		position: 'absolute',
		backgroundColor: COLORS.TRANSPARENT
	},
	iconUser: {
		left: 0,
		bottom: -20,
		right: 0,
		textAlign: 'center'
	},
	iconCross: {
		alignSelf: 'center',
		height: ICON_SIZE,
		backgroundColor: COLORS.TRANSPARENT
	},
	error: {
		borderColor: COLORS.RED,
		borderWidth: 1,
		backgroundColor: COLORS.RED_TRANS
	},
	addImageText: {
		fontSize: FONT_SIZES.L,
		fontWeight: '500'
	}
});

export default class ImageButton extends Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	_renderIcon() {
		if(this.props.main) {
			return [
				<Icon key="user_icon" name="md-person" style={[styles.icon, styles.iconUser]} color={COLORS.GREY_LIGHT_TRANS} size={ICON_MAIN_SIZE} />,
				<CustomText key="add_photo" style={styles.addImageText}>{I18n.t('add_image')}</CustomText>
			];
		} else {
			return [
				<Icon key="user_icon" name="md-person" style={[styles.icon, styles.iconUser]} color={COLORS.GREY_LIGHT_TRANS} size={ICON_SIZE} />,
				<Icon key="add_icon" style={styles.iconCross} color={COLORS.MAIN_BLUE} size={ICON_SIZE} name="ios-add" />
			];
		}
	}

	render() {
		if(this.props.loading) {
			return (
				<View style={[styles.imageFrame, this.props.style]} >
					<Loading color={COLORS.MAIN_BLUE} />
				</View>
			);
		}
		return (
			<TouchableOpacity style={[styles.imageFrame, this.props.style]} onPress={this.props.onPress}>
				{this.props.source ? (
					<Image style={[styles.image, this.props.imagesStyle]} resizeMode="cover" source={this.props.source}/>
				) : (
					this._renderIcon()
				)}
			</TouchableOpacity>
		);
	}
}