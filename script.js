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
		if (gameBoard.array.some((e) => e.every((test) => test === marker)))
			console.log(`${marker} is the Winner!`);
		// if (gameBoard.array)
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
		plays.push([column, row]);
		gameBoard.array[row][column] = getMarker();
		gameControl.updateGameBoard(getMarker());
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

player2.placeMarker([2, 0]);
player2.placeMarker([1, 0]);
player2.placeMarker([0, 0]);
