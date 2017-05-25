import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import SwipeableViews from 'react-swipeable-views-native';
import SwipeableView from './SwipeableView';
import SwipeableIndicatorBar from './SwipeableIndicatorBar';
import BottomActionBar from './BottomActionBar';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomText from './CustomText';
import { COLORS } from '../utils/constants';

export default class SwipableComponent extends Component {

	static propTypes = {
		views: PropTypes.arrayOf(PropTypes.shape({
			content: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
			imgSource: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
		})),
		bottomActionBar: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
		indicatorBar: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
	};

	constructor(props) {
		super(props);
		this.state = {currentIndexView: 0, applyIndex: 0};

		this._goPrev = this._goPrev.bind(this);
		this._goNext = this._goNext.bind(this);
		this._onIndexChange = this._onIndexChange.bind(this);
	}

	getSwipeableViews(){
		let res = [];
		let views = this.props.views;
		if(views && views.length){
			res = views.map((v,i)=>{
				return (
					<SwipeableView key={'s_v_'+i} animImgs={v.animImgs} imgSource={v.imgSource} imgCover={!!v.imgCover} content={v.content} />
				);
			});
		}
		return res;
	}

	_goPrev(){
		let newIndex = this.state.currentIndexView - 1;
		(newIndex >= 0) && this.setState({currentIndexView: newIndex, applyIndex: newIndex});
	}

	_goNext(){
		let nChilds = this.props.views.length;
		let newIndex = this.state.currentIndexView + 1;
		(newIndex < nChilds) && this.setState({currentIndexView: newIndex, applyIndex: newIndex});
	}

	_getPrevIntroArrow(){
		if(this.state.currentIndexView > 0) {
			return {
				onPress: this._goPrev,
				element: <Icon color="#ffffff" size={40} backgroundColor="transparent" name="ios-arrow-back"></Icon>
			};
		}
	}

	_getNextIntroArrow(){
		let nChilds = this.props.views.length;
		if(this.state.currentIndexView < nChilds - 1){
			return {
				onPress: this._goNext,
				element: <Icon color="#ffffff" size={40} backgroundColor="transparent" name="ios-arrow-forward"></Icon>
			};
		}
		else if(this.props.onFinish instanceof Function){
			return {
				onPress: this.props.onFinish,
				element: <CustomText style={{color: '#FFFFFF', fontSize: 20}}>OK</CustomText>
			};
		}
	}
	
	_onIndexChange(i, from){
		this.setState({currentIndexView: i});
		this.props.onPageChange && this.props.onPageChange(i);
	}

	render() {
		return (
			<View style={this.props.style}>
				<SwipeableViews index={this.state.applyIndex} onChangeIndex={this._onIndexChange}>
					{this.getSwipeableViews()}
				</SwipeableViews>
				{(this.props.indicatorBar === true ? (
					<SwipeableIndicatorBar hasBottomBar={!!this.props.bottomActionBar} currentIndex={this.state.currentIndexView} totalSteps={this.props.views ? this.props.views.length : 0} indicatorShadow currentStepFill={COLORS.WHITE} currentStepStroke={COLORS.WHITE} visitedStepStroke={COLORS.MAIN_BLUE} visitedStepFill={COLORS.MAIN_BLUE} normalStepStroke={COLORS.MAIN_BLUE} normalStepFill={COLORS.MAIN_BLUE} indicatorsSize={6} />
				) : (React.isValidElement(this.props.indicatorBar)) ?
					this.props.indicatorBar : null)}
				{(this.props.bottomActionBar === true ? (
					<BottomActionBar actionBarBackgroundColor="#F6B324" leftButton={this._getPrevIntroArrow()} rightButton={this._getNextIntroArrow()} />
				) : (React.isValidElement(this.props.bottomActionBar)) ?
					this.props.bottomActionBar : null)}
			</View>
		);
	}
}