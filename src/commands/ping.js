module.exports = {
	
	name: 'ping',
	description: 'Pings the bot.',
	
	execute(message, arguments, jointArguments) {
		
		message.reply(':ping_pong: Pong!');
	},
}