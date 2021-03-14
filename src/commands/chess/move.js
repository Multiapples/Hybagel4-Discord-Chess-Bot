module.exports = {
	
	name: 'move',
	description: '',
	
	execute(message, arguments, jointArguments) {
		
		if (this.parent.isInGame(message.author.id)) {
			
			if (arguments.length == 2) {
				
				if (arguments[0].length == 2 && arguments[1].length == 2) {
					
					const coordsRegex = /[A-Ha-h][0-8]/; // file-rank (eg. e4, a8, h1)
					
					if (arguments[0].match(coordsRegex) && arguments[1].match(coordsRegex)) {
						
						const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 //a -> 0; b -> 1; ... h -> 7;
						
						const startFile = alphaVal(arguments[0].charAt(0));
						const startRank = parseInt(arguments[0].charAt(1)) - 1;
						const endFile   = alphaVal(arguments[1].charAt(0));
						const endRank   = parseInt(arguments[1].charAt(1)) - 1;
						
						message.reply(this.parent.playerMakeMove(message.author.id, startFile + startRank*8, endFile + endRank*8));
					}
				}
			}
		}
		else {
			
			message.reply('You are not in a game.');
		}
	},
}