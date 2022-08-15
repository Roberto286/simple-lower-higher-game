const input: NodeRequire = require('prompt-sync')({ sigint: true });

const welcomeMessage: string = 'higher or lower game';
let difficulty: number = 0;
let game: Game | null = null;

const welcome = (): void => {
	console.log(welcomeMessage);
};

const startGame = (): void => {
	let start: number = 0;
	welcome();
	while (start !== 1 && start !== 2 && start !== 3) {
		start = +input('Choose difficulty level from 1/2/3: ');
		if (start !== 1 && start !== 2 && start !== 3) {
			console.error('invalid difficulty level');
			continue;
		}
		difficulty = start;
	}
};
class Game {
	difficulty: number;
	numberToGuess: number = 0;
	possibilities: number = 0;
	constructor(difficulty: number) {
		this.difficulty = difficulty;
		this.possibilities = 10;
	}

	generateNumber(): void {
		let maxNum: number = 0;
		switch (this.difficulty) {
			case 1:
				maxNum = 10;
				break;
			case 2:
				maxNum = 100;
				break;
			case 3:
				maxNum = 1000;
				break;
		}
		this.numberToGuess = Math.floor(Math.random() * maxNum) + 1;
	}

	gameOver(): void {
		console.log('GAME OVER');
		let playAgain: string = input('wanna play again? y|n');
		while (playAgain !== 'y' && playAgain !== 'n') {
			playAgain = input('play again? y|n: ');
		}
		switch (playAgain) {
			case 'y':
				console.clear();
				game = null;
				break;

			case 'n':
				console.log('GOODBYE');
				break;
		}
	}
}

while (!game) {
	startGame();
	game = new Game(difficulty);
	console.log(`let's go, you have ${game.possibilities} possibilities`);
	game.generateNumber();
	let playerNumber: number = +input('guess number: ');
	while (!Number(playerNumber)) {
		playerNumber = +input('wrong input');
	}
	while (playerNumber !== game.numberToGuess) {
		if (playerNumber < game.numberToGuess) {
			console.log(`lower, you have ${--game.possibilities} possibilities`);
			playerNumber = +input('');
		}
		if (playerNumber > game.numberToGuess) {
			console.log(`higher, you have ${--game.possibilities} possibilities`);
			playerNumber = +input('');
		}
		if (game.possibilities <= 1) {
			game.gameOver();
			break;
		}
	}
	if (game && playerNumber === game.numberToGuess) {
		console.log('YEAH!!');
		game.gameOver();
	}
}
