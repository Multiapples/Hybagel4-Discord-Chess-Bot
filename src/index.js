const fs = require('fs');
const { loadImage } = require('canvas');
const Discord = require('discord.js');
const { token } = require('./token.json');
const prefix = '^'

const client = new Discord.Client();
client.commands = loadCommands();

loadChessSprites();

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

async function loadChessSprites() {

	const board   = await loadImage('./assets/chess/board.png'       ).catch(e => {console.log(e.message)});
	const pawnW   = await loadImage('./assets/chess/white_pawn.png'  ).catch(e => {console.log(e.message)});
	const knightW = await loadImage('./assets/chess/white_knight.png').catch(e => {console.log(e.message)});
	const bishopW = await loadImage('./assets/chess/white_bishop.png').catch(e => {console.log(e.message)});
	const rookW   = await loadImage('./assets/chess/white_rook.png'  ).catch(e => {console.log(e.message)});
	const queenW  = await loadImage('./assets/chess/white_queen.png' ).catch(e => {console.log(e.message)});
	const kingW   = await loadImage('./assets/chess/white_king.png'  ).catch(e => {console.log(e.message)});
	const pawnB   = await loadImage('./assets/chess/black_pawn.png'  ).catch(e => {console.log(e.message)});
	const knightB = await loadImage('./assets/chess/black_knight.png').catch(e => {console.log(e.message)});
	const bishopB = await loadImage('./assets/chess/black_bishop.png').catch(e => {console.log(e.message)});
	const rookB   = await loadImage('./assets/chess/black_rook.png'  ).catch(e => {console.log(e.message)});
	const queenB  = await loadImage('./assets/chess/black_queen.png' ).catch(e => {console.log(e.message)});
	const kingB   = await loadImage('./assets/chess/black_king.png'  ).catch(e => {console.log(e.message)});
	
	const legalOverlay = await loadImage('./assets/chess/legal_overlay.png').catch(e => {console.log(e.message)});
	
	sprites = new Discord.Collection();
	
	sprites.set('board', board);
	sprites.set('white_pawn', pawnW);
	sprites.set('white_knight', knightW);
	sprites.set('white_bishop', bishopW);
	sprites.set('white_rook', rookW);
	sprites.set('white_queen', queenW);
	sprites.set('white_king', kingW);
	sprites.set('black_pawn', pawnB);
	sprites.set('black_knight', knightB);
	sprites.set('black_bishop', bishopB);
	sprites.set('black_rook', rookB);
	sprites.set('black_queen', queenB);
	sprites.set('black_king', kingB);
	sprites.set('legal_overlay', legalOverlay);

	require('./commands/chess.js').sprites = sprites;
}