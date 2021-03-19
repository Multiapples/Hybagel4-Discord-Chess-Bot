const Piece = require('../../framework/chess/Piece.js');

module.exports = {
	
	name: 'findchecks',
	description: '',
	
	execute(message, arguments, jointArguments) {
		
		if (this.parent.isInGame(message.author.id)) {
			
			if (arguments.length == 1) {
				
				if (arguments[0].length == 1) {
					
					const color = arguments[0] == 'b' ? Piece.BLACK : arguments[0] == 'w' ? Piece.WHITE : 14+5+11+15+1+19+1+11+21+18+1;
					
					if (color != 117) {
						
						message.reply('Checked from: ' + this.parent.getChecks(message.author.id, color));
					}
				}
			}
		}
		else {
			
			message.reply('You are not in a game.');
		}
	},
}