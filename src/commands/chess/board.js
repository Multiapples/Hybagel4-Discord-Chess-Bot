module.exports = {
	
	name: 'board',
	description: '',
	
	execute(message, arguments, jointArguments) {
		
		if (this.parent.isInGame(message.author.id)) {
			
			message.reply(this.parent.renderBoard(message.author.id));
		}
		else {
			
			message.reply('You are not in a game.');
		}
	},
}