import React from 'react';
import {Dimensions} from 'react-native';
import {Key, KeyText} from './StyledWordleKeyboard';

const {width: screenWidth} = Dimensions.get('window');
const keyWidth = screenWidth / 10 - 14;

export const KeyButton = ({keyValue, letterColors, onKeyPress}) => {
	const key = keyValue === '⌫' ? 'BACKSPACE' : keyValue;
	return (
		<Key
			key={keyValue}
			style={{
				backgroundColor: letterColors[keyValue] || '#DDDDDD',
				minWidth: keyWidth,
			}}
			onPress={() => onKeyPress(key)}>
			<KeyText>{keyValue}</KeyText>
		</Key>
	);
};
