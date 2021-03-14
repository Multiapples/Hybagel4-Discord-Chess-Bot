module.exports = {
	
	name: 'legalMoves',
	description: '',
	
	execute(message, arguments, jointArguments) {
		
		if (this.parent.isInGame(message.author.id)) {
			
			
		}
		else {
			
			message.reply('You are not in a game.');
		}
	},
}