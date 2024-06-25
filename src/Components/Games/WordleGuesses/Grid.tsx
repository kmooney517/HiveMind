import React from 'react';
import {
	GridWrapper,
	UserEmail,
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
	email: string;
}

const Grid: React.FC<GridProps> = ({guesses, email}) => {
	return (
		<GridWrapper>
			<GridContainer>
				{guesses.map((row, rowIndex) => (
					<Row key={rowIndex}>
						{row.map((cell, cellIndex) => (
							<Cell
								key={cellIndex}
								style={{backgroundColor: cell.color}}>
								<Letter>{cell.letter}</Letter>
							</Cell>
						))}
					</Row>
				))}
			</GridContainer>
		</GridWrapper>
	);
};

export default Grid;
