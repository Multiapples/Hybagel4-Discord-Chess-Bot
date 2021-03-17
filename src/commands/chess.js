const CommandCollection = require('../framework/CommandCollection.js');
const Board = require("./chess/board");
const LegalMoves = require("./chess/legalMoves.js");
const Move = require("./chess/move.js");
const NewGame = require("./chess/newGame.js");

const Discord = require('discord.js');
const Game = require('../framework/chess/Game.js');

const collection = Object.create(CommandCollection);

collection.name = 'chess';
description = '';
collection.setSubCommands([Board, LegalMoves, Move, NewGame]);

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

module.exports = collection;