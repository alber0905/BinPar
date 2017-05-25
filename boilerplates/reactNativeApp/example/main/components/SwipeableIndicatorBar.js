import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Point from '../components/Point';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	main: {
		position: 'absolute',
		right: 0,
		left: 0,
		bottom: 0,
		justifyContent: 'center',
		flexDirection: 'row',
		alignItems: 'center',
		height: 40,
		backgroundColor: COLORS.TRANSPARENT
	}
});

export default class SwipeableIndicatorBar extends Component {

	static propTypes = {
		currentStepStroke: PropTypes.string,
		currentStepFill: PropTypes.string,
		visitedStepStroke: PropTypes.string,
		visitedStepFill: PropTypes.string,
		normalStepStroke: PropTypes.string,
		normalStepFill: PropTypes.string,
		indicatorsSize: PropTypes.number,
		currentIndex: PropTypes.number,
		totalSteps: PropTypes.number,
		hasBottomBar: PropTypes.bool,
		indicatorShadow: PropTypes.bool
	};
	
	constructor(props) {
		super(props);
		this.state = {};
	}

	_getPointSteps(step){
		let res = [];
		let size = this.props.indicatorsSize || 5;
		for(let i = 0, l = this.props.totalSteps || 0; i < l; i++){
			let pCustomStyle = {
				marginLeft: (i===0) ? 0 : 15
			};
			if(this.props.indicatorShadow) {
				Object.assign(pCustomStyle, {
					shadowColor: COLORS.DARK,
					shadowOffset: {
						width: 0,
						height: 2
					},
					shadowOpacity: 1,
					shadowRadius: 1.5
				});
			}
			if(step > i){
				//visited
				if(this.props.visitedStepFill) {
					pCustomStyle.backgroundColor = this.props.visitedStepFill;
				}
				if(this.props.visitedStepStroke) {
					pCustomStyle.borderColor = this.props.visitedStepStroke;
					pCustomStyle.borderWidth = 1;
				}
			}
			else if(step == i){
				//current
				if(this.props.currentStepFill) {
					pCustomStyle.backgroundColor = this.props.currentStepFill;
				}
				if(this.props.currentStepStroke) {
					pCustomStyle.borderColor = this.props.currentStepStroke;
					pCustomStyle.borderWidth = 1;
				}
			}
			else{
				//normal
				if(this.props.normalStepFill) {
					pCustomStyle.backgroundColor = this.props.normalStepFill;
				}
				if(this.props.normalStepStroke) {
					pCustomStyle.borderColor = this.props.normalStepStroke;
					pCustomStyle.borderWidth = 1;
				}
			}
			res.push(<Point key={'i_p_'+i} radius={size} customStyle={pCustomStyle} />);
		}
		return res;
	}

	render() {
		let stylesMain = [styles.main];
		if(this.props.style){
			stylesMain.push(this.props.style);
		}
		return (
			<View style={stylesMain}>
				{this._getPointSteps(this.props.currentIndex)}
			</View>
		);
	}
}