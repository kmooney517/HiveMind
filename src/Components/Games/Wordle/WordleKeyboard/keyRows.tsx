const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');

export const keyRows = [
	alphabet.slice(0, 10),
	alphabet.slice(10, 19),
	['ENTER', ...alphabet.slice(19), '⌫'],
];
