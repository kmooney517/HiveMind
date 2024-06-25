import React from 'react';
import {Keyboard, Row} from './StyledWordleKeyboard';
import {keyRows} from './keyRows';
import {KeyButton} from './KeyButton';

const WordleKeyboard = ({onKeyPress, letterColors}) => {
	return (
		<Keyboard>
			{keyRows.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map(keyValue => (
						<KeyButton
							key={keyValue}
							keyValue={keyValue}
							letterColors={letterColors}
							onKeyPress={onKeyPress}
						/>
					))}
				</Row>
			))}
		</Keyboard>
	);
};

export default WordleKeyboard;
