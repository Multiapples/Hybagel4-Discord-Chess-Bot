const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./token.json');
const prefix = '^'

const client = new Discord.Client();
client.commands = loadCommands();

client.once('ready', () => {
	
	console.log('Ready!');
});

client.on('message', message => {
	
	if (!doesStartWithPrefix(message.content) || message.author.bot) return;
	
	const command = message.content.slice(prefix.length).trim();
	
	const commandPieces = command.split(/ +/);
	
	const name = commandPieces.shift();
	const arguments = commandPieces;
	const jointArguments = command.slice(name.length).trim();
	
	if (doesCommandExist(name)) {
		
		try {
			
			client.commands.get(name).execute(message, arguments, jointArguments);
			
		} catch (error) {
			
			console.error(error);
			message.reply('An error occurred.')
		}
	}
});

client.login(token);

function loadCommands() {
	
	const commands = new Discord.Collection();
	
	const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	
	for (const file of files) {
		
		const command = require(`./commands/${file}`);
		
		commands.set(command.name, command);
	}
	
	return commands;
}

function doesStartWithPrefix(messageContent) {
	
	return messageContent.startsWith(prefix);
}

function doesCommandExist(name) {
	
	return client.commands.has(name);
}