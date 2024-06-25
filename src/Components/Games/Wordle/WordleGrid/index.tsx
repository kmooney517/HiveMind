import React from 'react';
import {Dimensions} from 'react-native';

import {Row, StyledTextInput} from './StyledWordleGrid';

const {height: screenHeight} = Dimensions.get('window');

const WordleGrid = ({guesses, handleInputChange, inputs}) => {
	return (
		<>
			{guesses.map((row, rowIndex) => (
				<Row key={rowIndex}>
					{row.map((cell, colIndex) => (
						<StyledTextInput
							key={colIndex}
							ref={inputs.current[rowIndex][colIndex]}
							style={{backgroundColor: cell.color}}
							screenHeight={screenHeight}
							value={cell.letter}
							onChangeText={value =>
								handleInputChange(value, rowIndex, colIndex)
							}
							maxLength={1}
							autoCapitalize="characters"
							showSoftInputOnFocus={false}
							caretHidden={true}
							editable={false}
						/>
					))}
				</Row>
			))}
		</>
	);
};

export default WordleGrid;
