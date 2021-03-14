const CommandCollection = require('../framework/CommandCollection.js');
const Board = require("./chess/board");
const Move = require("./chess/move.js");
const NewGame = require("./chess/newGame.js");

const Discord = require('discord.js');
const Game = require('../framework/chess/Game.js');

const collection = Object.create(CommandCollection);

collection.name = 'chess';
description = '';
collection.setSubCommands([Board, Move, NewGame]);

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

collection.playerMakeMove = function(playerID, startSquare, endSquare) {
	
	const game = this.games.get(playerID);
	
	game.move(startSquare, endSquare);
	
	return game.render();
}

module.exports = collection;