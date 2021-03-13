const Position = require('./Position.js');

module.exports = class ChessGame {
	
	
	constructor() {
		
		this.position = new Position();
	}
	
	render() {
		
		let board = '\n```';
		
		for (let j = 0; j < 8; j++) {
			
			for (let i = 0; i < 8; i++) {
				board += (i + j) % 2 == 0 ? '  ' : '--';
			}
			board += '\n';
		}
		
		board += '```';
		
		return board;
	}
}