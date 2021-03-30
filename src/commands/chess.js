const CommandCollection = require('../framework/CommandCollection.js');

const subCommands = [];
subCommands.push(require("./chess/board"));
subCommands.push(require("./chess/legalMoves.js"));
subCommands.push(require("./chess/move.js"));
subCommands.push(require("./chess/newGame.js"));
subCommands.push(require("./chess/checks.js"));

const Discord = require('discord.js');
const Game = require('../framework/chess/Game.js');

const collection = Object.create(CommandCollection);

collection.name = 'chess';
description = '';
collection.setSubCommands(subCommands);

collection.games = new Discord.Collection();

collection.isInGame = function(playerId) {
	
	return this.games.has(playerId);
};

collection.createNewGame = function(player1Id) {
	
	const game = new Game();
	this.games.set(player1Id, game);
};

collection.renderBoard = function(playerId) {
	
	return (this.games.get(playerId)).render();
};

collection.playerMakeMove = function(playerID, startSquare, endSquare) {
	
	const game = this.games.get(playerID);
	
	game.move(startSquare, endSquare);
	
	return game.render();
};

collection.getPieceLegalMoves = function(playerID, square) {
	
	const game = this.games.get(playerID);
	
	return game.getPieceLegalMoves(square);
};

collection.getChecks = function(playerID, color) {
	
	const game = this.games.get(playerID);
	
	return game.getChecks(color);
}

collection.isWhiteToMove = function(playerID) {
	
	const game = this.games.get(playerID);
	
	return game.isWhiteToMove();
}

module.exports = collection;