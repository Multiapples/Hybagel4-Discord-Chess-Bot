module.exports = {
	
	name: 'legalmoves',
	description: '',
	
	execute(message, arguments, jointArguments) {
		
		if (this.parent.isInGame(message.author.id)) {
			
			if (arguments.length == 1) {
				
				if (jointArguments == 'nuclear') {
					
					let data = '';
					
					for (let i = 0; i < 64; i++) {
					
						data += 'your moves: ' + this.parent.getPieceLegalMoves(message.author.id, i);
					}
					
					console.log(data);
					message.reply('output logged in dev console');
				}
				
				if (arguments[0].length == 2) {
					
					const coordsRegex = /[A-Ha-h][0-8]/; // file-rank (eg. e4, a8, h1)
					
					if (arguments[0].match(coordsRegex)) {
						
						const alphaVal = (s) => s.toLowerCase().charCodeAt(0) - 97 //a -> 0; b -> 1; ... h -> 7;
						
						const file = alphaVal(arguments[0].charAt(0));
						const rank = parseInt(arguments[0].charAt(1)) - 1;
						
						message.reply('your moves: ' + this.parent.getPieceLegalMoves(message.author.id, file + rank*8));
					}
				}
			}
		}
		else {
			
			message.reply('You are not in a game.');
		}
	},
}