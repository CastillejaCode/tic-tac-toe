/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');

const gameBoard = (() => {
	const gameBoardArray = [
		['X', '0', 'X'],
		['0', 'X', '0'],
		['0', 'X', '0'],
	];
	return { gameBoardArray };
})();

// console.log(gameBoard.gameBoardArray[0]);

function displayGameBoard() {
	squares.forEach((e) => {
		e.textContent = gameBoard.gameBoardArray[e.dataset.row][e.dataset.index];
		e.value = e.textContent;
	});
}

displayGameBoard();
