module.exports = {
	
	name: 'newgame',
	description: 'Starts a new game of chess.',
	
	execute(message, arguments, jointArguments) {
		
		if (!this.parent.isInGame(message.author.id)) {
			
			this.parent.createNewGame(message.author.id);
			message.reply('New game started...');
		}
		else {
			
			message.reply('You are already in a game!');
		}
		
		message.reply('https://cdn.discordapp.com/attachments/502998965923479553/819400829982998617/1._e4_2._Ke2.gif');
	},
}