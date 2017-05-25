import React, {Component} from 'react';
import {StyleSheet, View, TextInput, KeyboardAvoidingView} from 'react-native';
import I18n from '../lang/lang';
import {COLORS, FONT_SIZES, STYLES} from '../utils/constants';
import Icon from 'react-native-vector-icons/Ionicons'
import Button from './Button';

const MIN_INPUT_HEIGHT = 35;
const MAX_INPUT_HEIGHT = 100;
const KEYBOARD_VERTICAL_OFFSET = -64;
const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: COLORS.GREY_LIGHT_NO_TRANS,
		padding: 7.5,
		left: 0,
		right: 0,
		bottom: 0
	},
	textInput: {
		flex: 1,
		marginRight: 10,
		padding: 5,
		paddingLeft: 15,
		backgroundColor: COLORS.WHITE,
		borderRadius: 5,
		color: COLORS.DARK,
		fontSize: FONT_SIZES.S
	},
	button: {
		height: null,
		backgroundColor: COLORS.TRANSPARENT,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	sendIcon: {
		backgroundColor: COLORS.TRANSPARENT
	}
});

export default class SendMessage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			inputHeight: MIN_INPUT_HEIGHT
		};
		this.sendMessage = this.sendMessage.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	sendMessage() {
		let message = this.state.value;
		if(this.props.onSendMessage){
			this.props.onSendMessage(message);
		} else {
			console.warn('[SendMessage - sendMessage]', 'No "onSendMessage" prop detected. You should pass a function that handle the send value');
		}
		this.setState({value: '', inputHeight: MIN_INPUT_HEIGHT});
	}

	onInputChange(event) {
		this.setState({value: event.nativeEvent.text, inputHeight: event.nativeEvent.contentSize.height});
	}

	render() {
		return (
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET} contentContainerStyle={styles.container}>
				<TextInput style={[styles.textInput, {height: Math.min(Math.max(MIN_INPUT_HEIGHT, this.state.inputHeight), MAX_INPUT_HEIGHT)}]}
						   ref="input"
						   onChange={this.onInputChange}
						   value={this.state.value}
						   multiline={true}
						   underlineColorAndroid={COLORS.TRANSPARENT}
						   placeholder={`${I18n.t('write_your_message_here')}...`} />
				<Button customProps={{ disabled: !this.state.value }} style={styles.button} onPress={this.sendMessage}>
					<Icon style={styles.sendIcon} color={COLORS.MAIN_BLUE} size={FONT_SIZES.XXXL} name="md-send" />
				</Button>
			</KeyboardAvoidingView>
		);
	}
}