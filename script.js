/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');
const btnStart = document.querySelector('.button-start');
const gameBoardContainer = document.querySelector('.gameBoard-container');

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
			gameBoardContainer.classList.toggle('winner');
			setTimeout(() => gameBoardContainer.classList.toggle('winner'), 300);
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

		// Check for tie
		if (
			gameBoard
				.getArray()
				.every((e) => e.every((test) => test === 'X' || test === '0'))
		) {
			console.log(`It's a tie!`);
			return true;
		}
	};

	const updateGameBoard = (marker) => {
		squares.forEach((e) => {
			e.textContent = gameBoard.getArray()[e.dataset.row][e.dataset.column];
			checkforWin(marker);
		});
	};

	const resetBoard = () => {
		gameBoard.getArray().forEach((e) => {
			e[0] = '';
			e[1] = '';
			e[2] = '';
		});
		updateGameBoard();
	};

	const toggle = true;
	const restart = false;
	// const getToggle = () => toggle;

	return { updateGameBoard, checkforWin, resetBoard, toggle, restart };
})();

// Players Factory Function
const players = (marker) => {
	const getMarker = () => marker;

	// const plays = [];
	// const getPlays = () => plays;

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
			gameControl.toggle = !gameControl.toggle;
		} else {
			console.log(`You can't pick a spot already chosen!`);
		}
	};

	return { getMarker, placeMarker };
};

const player1 = players('X');
const player2 = players('0');

squares.forEach((e) => {
	e.addEventListener('click', () => {
		if (gameControl.toggle)
			player1.placeMarker([e.dataset.column, e.dataset.row]);
		else {
			player2.placeMarker([e.dataset.column, e.dataset.row]);
		}
	});
});

btnStart.addEventListener('click', () => gameControl.resetBoard());

// player1.placeMarker([0, 1]);
// player2.placeMarker([1, 1]);
// player1.placeMarker([0, 0]);
// player2.placeMarker([0, 2]);
// player2.placeMarker([2, 2]);
// // player2.placeMarker([2, 0]);
// player1.placeMarker([2, 1]);
// player2.placeMarker([1, 0]);
// player1.placeMarker([1, 2]);
// player1.placeMarker([2, 0]);
// gameControl.resetBoard();
// player1.placeMarker([0, 1]);
// player2.placeMarker([1, 1]);
// player1.placeMarker([0, 0]);
// player1.placeMarker([0, 2]);
// player2.placeMarker([2, 1]);
