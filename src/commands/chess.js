const CommandCollection = require('../framework/CommandCollection.js');
const Board = require("./chess/board");

const collection = Object.create(CommandCollection);

collection.name = 'chess';
description = '';
collection.setSubCommands([Board]);

module.exports = collection;