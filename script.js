/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');

const gameBoard = (() => {
	const gameBoardArray = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];
	return { gameBoardArray };
})();

function displayGameBoard() {
	squares.forEach((e) => {
		e.textContent = gameBoard.gameBoardArray[e.dataset.row][e.dataset.index];
	});
}

// gameBoard.gameBoardArray[0][1] = 1234;

displayGameBoard();

const players = (marker = 'X') => {
	const updateGameBoard = ([Y, X]) => {
		gameBoard.gameBoardArray[Y][X] = marker;
		displayGameBoard();
	};

	const receiveSquareInfo = () => {
		squares.forEach((e) =>
			e.addEventListener('click', () => {
				let [X, Y] = [e.dataset.index, e.dataset.row];
				updateGameBoard([Y, X]);
			})
		);
	};

	return { receiveSquareInfo };
	// const placeMarker = (X) => gameBoard.gameBoardArray;
};

const player1 = players('X');
const player2 = players('0');
player1.receiveSquareInfo();
// player2.receiveSquareInfo();
