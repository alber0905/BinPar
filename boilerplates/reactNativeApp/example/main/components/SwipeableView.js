import React, {Component, PropTypes} from 'react';
import {StyleSheet, Text, View, ScrollView, Image} from 'react-native';
import { COLORS } from '../utils/constants';

const styles = StyleSheet.create({
	swipeableWrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		backgroundColor: COLORS.WHITE_DARK
	},
	imageView: {
		flex: 0.75,
		justifyContent: 'center'
	},
	textView: {
		flex:0.25,
		justifyContent: 'center',
		alignSelf: 'stretch',
		backgroundColor: COLORS.WHITE_DARK,
		paddingHorizontal: 20
	}
});

export default class SwipeableView extends Component {

	static propTypes = {
		content: PropTypes.oneOfType([ PropTypes.element, PropTypes.string ]),
		imgSource: PropTypes.any
	};
	
	constructor(props) {
		super(props);
		this.state = {
			height: 0,
			width: 0
		};
	}

	render() {
		return (
			<View style={styles.swipeableWrapper}>
				<View style={styles.textView}>
					{this.props.content}
				</View>
				<View onLayout={(e)=>{ this.setState({height: e.nativeEvent.layout.height, width: e.nativeEvent.layout.width }); }} style={styles.imageView}>
					<Image style={{height: this.state.height, width: this.state.width}} resizeMode={this.props.imgCover ? 'cover' : 'contain'} source={this.props.imgSource}/>
				</View>
			</View>
		);
	}
}