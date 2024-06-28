export interface UserGuess {
	user_id: string;
	guess: {letter: string; color: string}[][];
	name: string;
	guessesTaken: number;
	completedToday: boolean;
}
