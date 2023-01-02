/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');

// Game Board IIFE
const gameBoard = (() => {
	const array = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	return { array };
})();

const gameControl = (() => {
	const checkforWin = (marker) => {
		// Check for complete rows
		if (gameBoard.array.some((e) => e.every((test) => test === marker)))
			console.log(`${marker} is the Winner!`);

		// Check for complete columns
		if (
			(gameBoard.array[0][0] === marker &&
				gameBoard.array[1][0] === marker &&
				gameBoard.array[2][0] === marker) ||
			(gameBoard.array[0][1] === marker &&
				gameBoard.array[1][1] === marker &&
				gameBoard.array[2][1] === marker) ||
			(gameBoard.array[0][2] === marker &&
				gameBoard.array[1][2] === marker &&
				gameBoard.array[2][2] === marker)
		)
			console.log(`${marker} is the Winner!`);

		// Check for complete diagonols
		if (
			(gameBoard.array[0][0] === marker &&
				gameBoard.array[1][1] === marker &&
				gameBoard.array[2][2] === marker) ||
			(gameBoard.array[0][2] === marker &&
				gameBoard.array[1][1] === marker &&
				gameBoard.array[2][0] === marker)
		)
			console.log(`${marker} is the Winner!`);
	};

	const updateGameBoard = (marker) => {
		squares.forEach((e) => {
			e.textContent = gameBoard.array[e.dataset.row][e.dataset.column];
			checkforWin(marker);
		});
	};

	return { updateGameBoard };
})();

// Players Factory Function
const players = (marker) => {
	const getMarker = () => marker;

	const plays = [];
	const getPlays = () => plays;

	const placeMarker = ([column, row]) => {
		// plays.push([column, row]);
		// Protect a/g duplicate spots
		if (gameBoard.array[row][column] === '') {
			gameBoard.array[row][column] = getMarker();
			gameControl.updateGameBoard(getMarker());
		} else console.log(`You can't pick a spot already chosen!`);
	};

	const getSquareInfo = () => {
		squares.forEach((e) =>
			e.addEventListener('click', (ele) => {
				plays.push([ele.dataset.column, ele.dataset.row]);
			})
		);
	};

	return { getMarker, getPlays, placeMarker, getSquareInfo };
};

const player1 = players('X');
const player2 = players('0');

player1.placeMarker([0, 0]);
player1.placeMarker([1, 1]);
player1.placeMarker([2, 2]);
