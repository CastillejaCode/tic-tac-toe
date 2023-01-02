/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');

// Game Board IIFE
const gameBoard = (() => {
	const array = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	const getArray = () => array;

	return { getArray };
})();

const gameControl = (() => {
	const checkforWin = (marker) => {
		// Check for complete rows
		if (gameBoard.getArray().some((e) => e.every((test) => test === marker))) {
			console.log(`${marker} is the Winner!`);
			return true;
		}
		// Check for complete columns
		if (
			(gameBoard.getArray()[0][0] === marker &&
				gameBoard.getArray()[1][0] === marker &&
				gameBoard.getArray()[2][0] === marker) ||
			(gameBoard.getArray()[0][1] === marker &&
				gameBoard.getArray()[1][1] === marker &&
				gameBoard.getArray()[2][1] === marker) ||
			(gameBoard.getArray()[0][2] === marker &&
				gameBoard.getArray()[1][2] === marker &&
				gameBoard.getArray()[2][2] === marker)
		) {
			console.log(`${marker} is the Winner!`);
			return true;
		}

		// Check for complete diagonols
		if (
			(gameBoard.getArray()[0][0] === marker &&
				gameBoard.getArray()[1][1] === marker &&
				gameBoard.getArray()[2][2] === marker) ||
			(gameBoard.getArray()[0][2] === marker &&
				gameBoard.getArray()[1][1] === marker &&
				gameBoard.getArray()[2][0] === marker)
		) {
			console.log(`${marker} is the Winner!`);
			return true;
		}
	};

	const updateGameBoard = (marker) => {
		squares.forEach((e) => {
			e.textContent = gameBoard.getArray()[e.dataset.row][e.dataset.column];
			checkforWin(marker);
		});
	};

	return { updateGameBoard, checkforWin };
})();

// Players Factory Function
const players = (marker) => {
	const getMarker = () => marker;

	const plays = [];
	const getPlays = () => plays;

	const placeMarker = ([column, row]) => {
		// plays.push([column, row]);

		// Protect a/g adding spots when winner announced
		if (gameControl.checkforWin('X') || gameControl.checkforWin('0')) {
			console.log('Game is over, no more picking!');
			return;
		}
		// Protect a/g duplicate spots
		if (gameBoard.getArray()[row][column] === '') {
			gameBoard.getArray()[row][column] = getMarker();
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

player1.placeMarker([0, 1]);
player1.placeMarker([1, 1]);
player2.placeMarker([0, 0]);
player2.placeMarker([2, 0]);
player1.placeMarker([2, 1]);
player2.placeMarker([1, 0]);
