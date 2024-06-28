import React from 'react';
import {
	GridWrapper,
	GridContainer,
	Row,
	Cell,
	Letter,
} from './StyledGridComponent';

interface Guess {
	letter: string;
	color: string;
}

interface GridProps {
	guesses: Guess[][];
	mini: Boolean;
}

const Grid: React.FC<GridProps> = ({guesses, mini = false}) => {
	return (
		<GridWrapper>
			<GridContainer>
				{guesses.map((row, rowIndex) => (
					<Row key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<Cell
								mini={mini}
								key={cellIndex}
								style={{backgroundColor: cell.color}}>
								{!mini && <Letter>{cell.letter}</Letter>}
							</Cell>
						))}
					</Row>
				))}
			</GridContainer>
		</GridWrapper>
	);
};

export default Grid;
