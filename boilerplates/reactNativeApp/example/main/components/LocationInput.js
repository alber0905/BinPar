import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput, ListView, ScrollView} from 'react-native';
import I18n from '../lang/lang';
import {COLORS, FONT_SIZES, API_KEY} from '../utils/constants';
import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import GoogleAPI from 'react-native-geocoder/js/googleApi';
import FormComponent from './FormComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from './Button';
import CustomText from './CustomText';

Geocoder.fallbackToGoogle(API_KEY);
GoogleAPI.addParams('both', ['language=es', 'region=es']);
GoogleAPI.addParams('address', ['components=country:ES']);

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	map: {
		marginTop: 10,
		alignSelf: 'stretch',
		height: 200
	},
	innerMap: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	iconPin:{
		backgroundColor: COLORS.TRANSPARENT
	},
	inputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderBottomColor: COLORS.DARK,
		borderBottomWidth: 1
	},
	input: {
		flex: 0.85,
		height: 30,
		paddingLeft: 10
	},
	locateMeButton: {
		flex: 0.1,
		height: 30,
		backgroundColor: COLORS.TRANSPARENT
	},
	list: {
		position: 'absolute',
		top: 31,
		left: 0,
		right: 0,
		shadowColor: COLORS.DARK,
		shadowOffset: {
			width: 1,
			height: 5
		},
		shadowRadius: 5,
		shadowOpacity: 0.5
	},
	contentContainerStyle: {
		maxHeight: 145
	},
	listItem: {
		height: null,
		paddingVertical: 10,
		marginHorizontal: 5,
		borderColor: COLORS.GREY_MEDIUM,
		borderBottomWidth: 1,
		backgroundColor: COLORS.TRANSPARENT,
		borderRadius: 0
	},
	listItemText: {
		color: COLORS.DARK,
		fontSize: FONT_SIZES.S,
		fontWeight: '500',
	},
	errorMessage: {
		color: COLORS.RED,
		marginTop: 5,
		fontSize: FONT_SIZES.S,
		fontWeight: '500'
	}
});
const SPAIN_REGION = {
	latitude: 40.4168135,
	longitude: -3.7032951,
	latitudeDelta: 7.315206843116528,
	longitudeDelta: 18.29954310715826,
};
const DEFAULT_CIRCLE_OPTIONS = {
	radius: 300,
	strokeWidth: 1,
	strokeColor: COLORS.MAIN_BLUE,
	fillColor: COLORS.MAIN_BLUE_TRANS
};
const EARTH_RADIUS = 6378137;

export default class LocationInput extends FormComponent {

	constructor(props) {
		super(props);
		this.state = {
			region: props.initialRegion || SPAIN_REGION,
			address: {
				marker: {
					latitude: 40.4168135,
					longitude: -3.7032951,
				}
			},
			addressList: new ListView.DataSource({
				rowHasChanged: (row1, row2) => this._isDirty
			}),
			search: props.search || '',
			showList: false
		};
		this.onChangeText = this.onChangeText.bind(this);
		this.findAddress = this.findAddress.bind(this);
		this.onRegionChange = this.onRegionChange.bind(this);
		this.locateMe = this.locateMe.bind(this);
		this.geocodePosition = this.geocodePosition.bind(this);
		this.onSuggestionPress = this.onSuggestionPress.bind(this);
		this.goToMarker = this.goToMarker.bind(this);
		this.renderRow = this.renderRow.bind(this);
	}

	onRegionChange(region) {
		this.setState({ region });
	}

	getValue() {
		return this.state.address;
	}

	setValue(newValue) {
		this.geocodePosition(newValue.latitude, newValue.longitude, true);
	}

	_findAddress(text) {
		try {
			GoogleAPI.geocodeAddress(API_KEY, text).then((addressRes)=>{
				if(addressRes && addressRes.length) {
					this._isDirty = true;
					this.setState({
						showList: true,
						addressList: this.state.addressList.cloneWithRows(addressRes)
					}, ()=>{
						this._isDirty = false;
					});
				}
			}).catch((err)=>{
				console.log('[_findAddress]', err);
				this.setState({showList: false});
			});
		} catch(err) {
			console.log('[_findAddress]', err);
			this.setState({showList: false});
		}
	}

	findAddress(text) {
		if(this._searchTimer) {
			clearTimeout(this._searchTimer);
			this._searchTimer = null;
		}
		this._searchTimer = setTimeout(this._findAddress.bind(this, text), 250);
	}

	onChangeText(text) {
		this.setState({ search: text });
		if(text && text.length > 2) {
			this.findAddress(text);
		}
	}

	geocodePosition(latitude, longitude, dontDispatchChange) {
		GoogleAPI.geocodePosition(API_KEY, {lat: latitude, lng: longitude}).then((addressInfo)=>{
			let firstAddress = addressInfo[0];
			if(firstAddress){
				firstAddress.marker = {
					latitude,
					longitude
				};
				this.setState({ search: firstAddress.formattedAddress, address: firstAddress }, ()=>{
					this.goToMarker(dontDispatchChange);
				});
			}
		}).catch((err)=>{
			console.log('[ERROR] GoogleAPI.geocodePosition', err);
		});
	}

	locateMe() {
		navigator.geolocation.getCurrentPosition((positionInfo)=>{
			this.geocodePosition(positionInfo.coords.latitude, positionInfo.coords.longitude);
		}, (err) => {
			console.log('[ERROR] geolocation.getCurrentPosition', err);
		}, { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 });
	}

	goToMarker(dontDispatchChange) {
		if(this.refs.map) {
			let center = this.state.address.marker;
			let latitude = center.latitude || center.lat;
			let longitude = center.longitude || center.lng;
			const deltaMeters = (DEFAULT_CIRCLE_OPTIONS.radius + 100) * 2;
			let latitudeDelta = (deltaMeters / EARTH_RADIUS) * 180 / Math.PI;
			let longitudeDelta = (deltaMeters / (EARTH_RADIUS * Math.cos(Math.PI * latitude / 180))) * 180 / Math.PI;
			this.refs.map.animateToRegion({ latitude, longitude, latitudeDelta, longitudeDelta }, 250);
		}
		this._updateValue(this.state.address, dontDispatchChange === true);
	}

	onSuggestionPress(address) {
		if(address){
			address.marker = {
				latitude: address.position.lat,
				longitude: address.position.lng
			};
			this.setState({ search: address.formattedAddress, address: address, showList: false }, ()=>{
				this.goToMarker();
			});
		}
	}

	renderRow(rowData) {
		return (
			<Button style={styles.listItem} onPress={this.onSuggestionPress.bind(this, rowData)}>
				<CustomText style={styles.listItemText} customProps={{ numberOfLines: 1 }}>{rowData.formattedAddress}</CustomText>
			</Button>
		);
	}

	render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.inputContainer}>
					<Icon name="ios-pin-outline" size={FONT_SIZES.XXXL} color={COLORS.DARK} style={styles.iconPin} />
					<TextInput style={styles.input} value={this.state.search} onChangeText={this.onChangeText} placeholder={I18n.t('write_here_your_address') + '...'} />
					<Button style={styles.locateMeButton} onPress={this.locateMe}><Icon style={styles.icon} name="md-locate" size={FONT_SIZES.XXXL} color={COLORS.MAIN_BLUE} /></Button>
				</View>
				<View style={styles.map}>
					<MapView ref="map" style={styles.innerMap} initialRegion={this.state.region} onRegionChange={this.onRegionChange} loadingEnabled={true} loadingIndicatorColor={COLORS.MAIN_BLUE} loadingBackgroundColor={COLORS.GREY_LIGHT_TRANS}>
						<MapView.Circle key={`c_${this.state.address.marker.latitude}${this.state.address.marker.longitude}`} {...DEFAULT_CIRCLE_OPTIONS} center={this.state.address.marker} />
					</MapView>
				</View>
				{this.state.showList && this.state.search && this.state.search.length > 2 ? (
					<View style={styles.list}>
						<ListView
							style={styles.contentContainerStyle}
							keyboardShouldPersistTaps="always"
							keyboardDismissMode="on-drag"
							dataSource={this.state.addressList}
							renderRow={this.renderRow}
						/>
					</View>
				) : null}
				{this.state._valid === false ? <CustomText style={styles.errorMessage}>* {this.state.errorMessage}</CustomText> : null}
			</View>
		);
	}
}