import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, Platform, Alert} from 'react-native';
import I18n from '../../lang/lang';
import ImagePicker from 'react-native-image-picker';
import ImageButton from './ImageButton';
import {COLORS, FONT_SIZES} from '../../utils/constants';
import CustomText from '../CustomText';

const MAIN_IMAGE_SQUARE_SIZE = 150;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	scrollViewStyle: {
		flex: 0.75
	},
	contentContainerStyle: {

	},
	mainImage: {
		width: MAIN_IMAGE_SQUARE_SIZE,
		height: MAIN_IMAGE_SQUARE_SIZE,
		marginLeft: 0,
		marginRight: 0
	},
	imagesStyle: {
		height: MAIN_IMAGE_SQUARE_SIZE,
		width: MAIN_IMAGE_SQUARE_SIZE
	},
	errorMessage: {
		color: COLORS.RED,
		margin: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});

export default class ImageUploader extends Component {

	constructor(props) {
		super(props);
		let defState = {
			_loading: false,
			_mainLoading: false,
			images: [],
			mainImage: null
		};
		this.state = defState;
	}

	getImageSources(){
		let res = {OK: true};
		if(this.state.mainImage) {
			res.mainImage = this.state.mainImage;
		} else {
			res.OK = false;
		}
		res.images = this.state.images || [];
		return res;
	}

	loadImages(mainImage, images) {
		let defState = {};
		if(mainImage) {
			defState.mainImage = { uri: mainImage.url, _id: mainImage.id };
		}
		if(images && images.length){
			defState.images = images.map((img) => {
				return { uri: img.url, _id: img.id };
			})
		}
		this.setState(defState);
	}

	_showActionSheet(hasImage, index){
		let isMainImage = index === 'main';
		let options = {
			title: null, // specify null or empty string to remove the title
			cancelButtonTitle: I18n.t('cancel'),
			takePhotoButtonTitle: I18n.t('take_picture')+'...', // specify null or empty string to remove this button
			chooseFromLibraryButtonTitle: I18n.t('from_library')+'...', // specify null or empty string to remove this button
			customButtons: [],
			cameraType: 'back', // 'front' or 'back'
			mediaType: 'photo', // 'photo' or 'video'
			maxWidth: 2000, // photos only
			maxHeight: 2000, // photos only
			quality: 1, // 0 to 1, photos only
			allowsEditing: true, // Built in functionality to resize/reposition the image after selection
			noData: false // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
			/*storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
			 skipBackup: true, // ios only - image will NOT be backed up to icloud
			 path: 'images' // ios only - will save image at /Documents/images rather than the root
			 }*/
		};
		if(hasImage){
			!isMainImage && options.customButtons.push({ name: 'makeMainImage', title: I18n.t('make_main_image') });
			options.customButtons.push({ name: 'remove', title: I18n.t('remove') });
		}
		if(isMainImage) {
			this.setState({_mainLoading: true});
		} else {
			this.setState({_loading: index});
		}
		ImagePicker.showImagePicker(options, (response) => {
			let newState = {
				_loading: false,
				_mainLoading: false
			};
			if (response.didCancel) {
				this.setState(newState);
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
				this.setState(newState);
			} else if (!isMainImage && response.customButton && response.customButton === 'makeMainImage') {
				let oldMainImage = this.state.mainImage;
				let oldMainImageId = oldMainImage && oldMainImage._id;
				newState.mainImage = this.state.images[index];
				let newMainImageId = newState.mainImage._id;
				if(oldMainImage) {
					this.state.images[index] = oldMainImage;
				} else {
					this.state.images.splice(index, 1);
				}
				newState.images = this.state.images;
				if(this.props.onMainImageChange) {
					this.props.onMainImageChange(oldMainImageId, newMainImageId).then(() => {
						this.setState(newState, () => {
							this.isValid();
						});
					}).catch((err) => {
						if(err === 'isNewUser') {
							this.setState(newState, () => {
								this.isValid();
							});
						} else {
							this.setState({
								_loading: false,
								_mainLoading: false
							}, () => {
								this.isValid();
							});
							Alert.alert('Error', 'Hubo un error inesperado en el servidor');
						}
					});
				} else {
					this.setState(newState, () => {
						this.isValid();
					});
				}
			} else if (response.customButton && response.customButton === 'remove') {
				let oldImage = null;
				let newMainImageId = null;
				if(isMainImage) {
					oldImage = this.state.mainImage;
					newState.mainImage = null;
					if(this.state.images && this.state.images.length) {
						newState.mainImage = this.state.images.shift();
						newState.images = this.state.images;
						newMainImageId = newState.mainImage._id;
					}
				} else {
					oldImage = this.state.images.splice(index, 1)[0];
					newState.images = this.state.images;
				}
				if(this.props.onImageRemove) {
					let oldImgId = oldImage && oldImage._id;
					this.props.onImageRemove(oldImgId, newMainImageId).then(() => {
						this.setState(newState, () => {
							this.isValid();
						});
					}).catch((err) => {
						if(err === 'isNewUser') {
							this.setState(newState, () => {
								this.isValid();
							});
						} else {
							this.setState({
								_loading: false,
								_mainLoading: false
							}, () => {
								this.isValid();
							});
							Alert.alert('Error', 'Hubo un error inesperado en el servidor');
						}
					});
				} else {
					this.setState(newState, () => {
						this.isValid();
					});
				}
			}
			else {
				let source = {uri: (Platform.OS === 'android' ? response.uri : response.uri.replace('file://', '')), isStatic: true, _base64: response.data, width: response.width, height: response.height};

				let oldImage = null;
				if(index == null){
					this.state.images.push(source);
				} else if(isMainImage) {
					oldImage = this.state.mainImage;
					newState.mainImage = source;
				} else {
					oldImage = this.state.images.splice(index, 1, source)[0];
				}
				newState.images = this.state.images;
				newState._error = false;
				if(this.props.onImageChange) {
					let oldImgId = oldImage && oldImage._id;
					this.props.onImageChange(source, isMainImage, oldImgId).then((newId) => {
						if(isMainImage) {
							newState.mainImage._id = newId;
						} else if(index != null) {
							newState.images[index]._id = newId;
						}
						this.setState(newState, () => {
							this.isValid();
						});
					}).catch((err) => {
						if(err === 'isNewUser') {
							this.setState(newState, () => {
								this.isValid();
							});
						} else {
							this.setState({
								_loading: false,
								_mainLoading: false
							}, () => {
								this.isValid();
							});
							Alert.alert('Error', 'Hubo un error inesperado en el servidor');
						}
					});
				} else {
					this.setState(newState, () => {
						this.isValid();
					});
				}
			}
		});
	}

	isValid(){
		let rules = this.props.validationRules;
		let newState = {
			_valid: true,
			errorMessage: null
		};
		if(rules) {
			let value = this.getImageSources();
			for (let i = 0, l = rules.length; i < l; i++) {
				let rule = rules[i];
				let validation = rule(value);
				if (!validation.OK) {
					newState._valid = false;
					newState.errorMessage = validation.error;
				}
			}
		}
		this.setState(newState);
		return newState._valid;
	}

	_renderImages(){
		let res = [];
		if(this.state.images) {
			res = this.state.images.map((img, i)=> {
				let source = {uri: img.uri};
				if(!source.uri){
					source.uri = 'data:image/jpeg;base64,' + img._base64;
				}
				return (
					<ImageButton loading={this.state._loading === i} key={`img_${i}`} source={source} onPress={this._showActionSheet.bind(this, true, i)} />
				);
			});
		}
		if(this.state._loading === null) {
			res.push(
				<ImageButton key="loader" loading />
			);
		} else {
			res.push(
				<ImageButton key="img_add" onPress={this._showActionSheet.bind(this, false, null)} />
			);
		}
		return res;
	}

	render() {
		return (
			<View style={this.props.style}>
				<View style={styles.container}>
					<ImageButton main style={styles.mainImage} imagesStyle={styles.imagesStyle} loading={this.state._mainLoading} source={this.state.mainImage} onPress={this._showActionSheet.bind(this, !!this.state.mainImage, 'main')}/>
					<ScrollView style={styles.scrollViewStyle} contentContainerStyle={styles.contentContainerStyle} horizontal={true} snapToAlignment="center" showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
						{this._renderImages()}
					</ScrollView>
				</View>
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}