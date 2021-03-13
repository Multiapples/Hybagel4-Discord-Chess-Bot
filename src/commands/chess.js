const CommandCollection = require('../framework/CommandCollection.js');
const Board = require("./chess/board");
const NewGame = require("./chess/newgame.js");

const Discord = require('discord.js');
const Game = require('../framework/chess/ChessGame.js');

const collection = Object.create(CommandCollection);

collection.name = 'chess';
description = '';
collection.setSubCommands([Board, NewGame]);

collection.games = new Discord.Collection();

collection.isInGame = function(playerId) {
	
	return this.games.has(playerId)
}

collection.createNewGame = function(player1Id) {
	
	const game = new Game();
	this.games.set(player1Id, game);
}

collection.renderBoard = function(playerId) {
	
	return (this.games.get(playerId)).render();
};

module.exports = collection;