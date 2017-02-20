import { sortBy } from '../utils.js';

const initialState = [
	{ name: 'Chris', age: 27 },
	{ name: 'Nate', age: 29 },
	{ name: 'Obi', age: 1 },
	{ name: 'Sarah', age: 26 },
];

const endState = initialState::sortBy('age');

describe('utils', () => {
	test('sortBy sorts an array of objects by the specified key', () => {
		expect(endState).toEqual(
			[
				{ name: 'Obi', age: 1 },
				{ name: 'Sarah', age: 26 },
				{ name: 'Chris', age: 27 },
				{ name: 'Nate', age: 29 },
			]
		);
	});
});