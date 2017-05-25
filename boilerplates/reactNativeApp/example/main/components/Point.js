import React, {Component} from 'react';
import {View} from 'react-native';

/**
 * @component: Point
 * @props:
 * 	radius: Number (Default: 10)
 * 	color: String (Default: '#000000')
 * 	type: String (Default: null)
 * 		-square-rounded
 * 	customStyle: Object (Default: null)
 */
export default class Point extends Component {

	static propTypes = {
		radius: React.PropTypes.number.isRequired,
		color: React.PropTypes.string.isRequired,
		type: React.PropTypes.string
	};

	static defaultProps = {
		radius: 10,
		color: '#000000'
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let radius = this.props.radius;
		let size = radius * 2;
		switch(this.props.type){
			case 'square-rounded':
				radius = radius * 0.75;
				break;
		}
		let styles = [{ height: size, width: size, borderRadius: radius, backgroundColor: this.props.color }];
		if(this.props.customStyle){
			styles[1] = this.props.customStyle;
		}
		return (
			<View style={styles}></View>
		);
	}
}