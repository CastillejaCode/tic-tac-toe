/* eslint-disable no-unused-vars */
const squares = document.querySelectorAll('.squares');
const btnStart = document.querySelector('.button-start');
const gameBoardContainer = document.querySelector('.gameBoard-container');
const title = document.querySelector('.title');
const player1Element = document.querySelector('.player1');
const player2Element = document.querySelector('.player2');
const score1 = document.querySelector('.score1');
const score2 = document.querySelector('.score2');
const limitRange = document.querySelector('#limit');
const limitValue = document.querySelector('.limit-value');
const optionComputer = document.querySelector('.computer');

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
	let scoreLimit = 5;
	let matchOver = false;
	let gameOver = false;

	const toggleWinner = () => {
		gameBoardContainer.classList.toggle('winner');
		setTimeout(() => gameBoardContainer.classList.toggle('winner'), 300);
	};

	const addScore = (marker) => {
		// prettier-ignore
		let currentPlayer = (marker === 'X' ? player1 : player2);
		currentPlayer.scores += 1;
		console.log(currentPlayer.scores);
		(marker === 'X' ? score1 : score2).textContent = currentPlayer.scores;
	};

	// const checkScoreLimit = (marker) => {
	// 	if ((marker === 'X' ? score1 : score2) === scoreLimit) {
	// 		title.textContent = `${
	// 			marker === 'X' ? player1.name : player2.name
	// 		} is the Champion`;
	// 	}
	// };

	// const checkGameOver = () => {
	// 	if (gameOver) return;
	// 	gameOver = true;
	// };

	const displayWinner = (marker) => {
		addScore(marker);
		if (
			(marker === 'X' ? player1.scores : player2.scores) ===
			gameControl.scoreLimit
		) {
			title.textContent = `${
				marker === 'X' ? player1.name : player2.name
			} is the Champion`;
			gameControl.matchOver = true;
		} else {
			title.textContent = `${
				marker === 'X' ? player1.name : player2.name
			} is the winner`;
			setTimeout((e) => {
				title.textContent = 'Tic-Tac-Toe';
			}, 2000);
		}

		// checkScoreLimit(marker);
		toggleWinner();
	};

	const checkforWin = (marker) => {
		// Check for complete rows
		if (gameBoard.getArray().some((e) => e.every((test) => test === marker))) {
			gameOver = true;
			displayWinner(marker);

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
			displayWinner(marker);

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
			displayWinner(marker);

			return true;
		}

		// Check for tie
		if (
			gameBoard
				.getArray()
				.every((e) => e.every((test) => test === 'X' || test === '0'))
		) {
			title.textContent = `Tie`;
			setTimeout((e) => {
				title.textContent = 'Tic-Tac-Toe';
			}, 2000);
			resetVisualBoard();
			return true;
		}
	};

	const updateGameBoard = (marker) => {
		squares.forEach((e) => {
			e.textContent = gameBoard.getArray()[e.dataset.row][e.dataset.column];
		});
		checkforWin(marker);
	};

	const resetBoard = () => {
		gameBoard.getArray().forEach((e) => {
			e[0] = '';
			e[1] = '';
			e[2] = '';
		});
		updateGameBoard();
	};

	function resetVisualBoard() {
		squares.forEach((ele) => {
			ele.style.backgroundColor = 'grey';
			ele.style.color = 'grey';
		});
		setTimeout(() => {
			gameControl.resetBoard();
			squares.forEach((e) => {
				e.style.backgroundColor = '#eaeaea';
				e.style.color = 'black';
			});
		}, 500);
	}

	const toggle = true;
	const restart = false;
	const computerStatus = true;
	const plays = [];
	// const getToggle = () => toggle;

	const getComputerChoice = () => {
		let row = Math.floor(Math.random() * 3);
		let column = Math.floor(Math.random() * 3);

		if (
			gameBoard.getArray()[row][column] !== '' &&
			!gameBoard
				.getArray()
				.every((e) => e.every((test) => test === 'X' || test === '0'))
		) {
			console.log('Loop');
			while (gameBoard.getArray()[row][column] !== '') {
				row = Math.floor(Math.random() * 3);
				column = Math.floor(Math.random() * 3);
			}
		}
		let result = [column, row];
		console.log(result);
		return result;
	};

	return {
		updateGameBoard,
		checkforWin,
		resetBoard,
		toggle,
		restart,
		resetVisualBoard,
		gameOver,
		matchOver,
		scoreLimit,
		computerStatus,
		getComputerChoice,
		plays,
	};
})();

// Players Factory Function
const players = (marker, name) => {
	const getMarker = () => marker;

	const scores = 0;

	const placeMarker = ([column, row]) => {
		// Protect a/g placing more markers when match won
		if (gameControl.matchOver) return;

		// Protect a/g adding spots when winner announced
		if (gameControl.gameOver) {
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

	return { getMarker, placeMarker, name, scores };
};

const player1 = players('X', 'Player 1');
const player2 = players('0', 'Player 2');
// const computer2 = players('0', 'Computer');

player1Element.addEventListener('input', () => {
	player1.name = player1Element.textContent;
});
player2Element.addEventListener('input', () => {
	player2.name = player2Element.textContent;
});

squares.forEach((e) => {
	e.addEventListener('click', () => {
		if (gameControl.computerStatus) {
			const playerCoords = [
				parseFloat(e.dataset.column),
				parseFloat(e.dataset.row),
			];
			player1.placeMarker(playerCoords);
			// gameControl.plays.push(playerCoords);
			player2.placeMarker(gameControl.getComputerChoice());
		} else {
			if (gameControl.toggle)
				player1.placeMarker([e.dataset.column, e.dataset.row]);
			else player2.placeMarker([e.dataset.column, e.dataset.row]);
		}
	});
});

btnStart.addEventListener('click', () => {
	if (gameControl.matchOver) {
		title.textContent = 'Tic-Tac-Toe';
		player1.scores = player2.scores = 0;
		score1.textContent = player1.scores;
		score2.textContent = player2.scores;
		gameControl.matchOver = false;
	}
	gameControl.resetVisualBoard();
	gameControl.gameOver = false;
});

limitRange.addEventListener('input', () => {
	limitValue.textContent = limitRange.value;
	gameControl.scoreLimit = parseFloat(limitRange.value);
	console.log(gameControl.scoreLimit, typeof gameControl.scoreLimit);
});

// optionComputer.addEventListener('click', () => {
// 	squares.forEach((e) => {
// 		e.addEventListener('click', () => {
// 			if (gameControl.toggle)
// 				player1.placeMarker([e.dataset.column, e.dataset.row]);
// 			else {
// 				player2.placeMarker([e.dataset.column, e.dataset.row]);
// 			}
// 		});
// 	});
// });
