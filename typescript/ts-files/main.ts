const input = require('prompt-sync')({ sigint: true });
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
		start = +input('Choose difficulty level: ');
		if (start !== 1 && start !== 2 && start !== 3) {
			console.error('invalid number');
			continue;
		}
		difficulty = start;
	}
};
class Game {
	difficulty: number;
	numberToGuess: number;

	constructor(difficulty: number) {
		this.difficulty = difficulty;
		this.numberToGuess = 0;
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
			playAgain = input('play again? y|n');
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
	game.generateNumber();
	let playerNumber: number = +input('guess number');
	while (playerNumber !== 1) {
		playerNumber = +input('wrong number');
	}
	game.gameOver();
}
