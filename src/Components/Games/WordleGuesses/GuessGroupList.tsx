import React from 'react';
import {
	GroupTitle,
	GuessGroup,
	UserGrids,
	GridWrapper,
	UserText,
} from './StyledWordleGuesses';
import Grid from './Grid';
import {UserGuess} from '@types';

interface GuessGroupListProps {
	groupedByGuesses: {[key: number]: UserGuess[]};
	worstPlayer: UserGuess;
}

const GuessGroupList: React.FC<GuessGroupListProps> = ({
	groupedByGuesses,
	worstPlayer,
}) => (
	<>
		{Object.keys(groupedByGuesses)
			.sort((a, b) => Number(b) - Number(a))
			.map(key => (
				<GuessGroup key={key}>
					<GroupTitle>{key} Guesses</GroupTitle>
					<UserGrids>
						{groupedByGuesses[Number(key)].map(userGuess => (
							<GridWrapper
								key={userGuess.user_id}
								isWorst={
									userGuess.user_id === worstPlayer.user_id
								}>
								<UserText>
									{userGuess.user_id ===
										worstPlayer.user_id && 'LOSER: '}
									{userGuess.name}
								</UserText>
								<Grid
									guesses={userGuess.guess}
									email={userGuess.email}
								/>
							</GridWrapper>
						))}
					</UserGrids>
				</GuessGroup>
			))}
	</>
);

export default GuessGroupList;
