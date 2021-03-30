const Position = require('./Position.js');
const Piece = require('./Piece.js');

module.exports = class Game {
	
	constructor() {
		
		this.position = new Position();
		this.position.wipe();
		this.position.cells[0] = Piece.ROOK   | Piece.WHITE;
		this.position.cells[1] = Piece.KNIGHT | Piece.WHITE;
		this.position.cells[2] = Piece.BISHOP | Piece.WHITE;
		this.position.cells[3] = Piece.QUEEN  | Piece.WHITE;
		this.position.cells[4] = Piece.KING   | Piece.WHITE;
		this.position.cells[5] = Piece.BISHOP | Piece.WHITE;
		this.position.cells[6] = Piece.KNIGHT | Piece.WHITE;
		this.position.cells[7] = Piece.ROOK   | Piece.WHITE;
		this.position.cells[8 ] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[9 ] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[10] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[11] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[12] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[13] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[14] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[15] = Piece.PAWN   | Piece.WHITE;
		this.position.cells[48] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[49] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[50] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[51] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[52] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[53] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[54] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[55] = Piece.PAWN   | Piece.BLACK;
		this.position.cells[56] = Piece.ROOK   | Piece.BLACK;
		this.position.cells[57] = Piece.KNIGHT | Piece.BLACK;
		this.position.cells[58] = Piece.BISHOP | Piece.BLACK;
		this.position.cells[59] = Piece.QUEEN  | Piece.BLACK;
		this.position.cells[60] = Piece.KING   | Piece.BLACK;
		this.position.cells[61] = Piece.BISHOP | Piece.BLACK;
		this.position.cells[62] = Piece.KNIGHT | Piece.BLACK;
		this.position.cells[63] = Piece.ROOK   | Piece.BLACK;
	}
	
	render() {
		
		const horizontalGrid = '+----+----+----+----+----+----+----+----+\n';
		
		let board = '```\n' + horizontalGrid;
		
		for (let j = 7; j >= 0; j--) {
			
			board += '|';
			
			for (let i = 0; i < 8; i++) {
				
				const piece = this.position.cells[i + j*8];
				
				board += ' ' + pieceToString(piece) + ' |';
			}
			
			board += '\n' + horizontalGrid;
		}
		
		board += '```';
		
		return board;
	}
	
	move(startSquare, endSquare) {
		
		this.position.move(startSquare, endSquare);
	}
	
	getPieceLegalMoves(cellIndex) {
		
		const legalMoves = this.position.getPieceLegalMoves(cellIndex);
		
		const horizontalGrid = '+----+----+----+----+----+----+----+----+\n';
		
		let board = '```\n' + horizontalGrid;
		
		for (let j = 7; j >= 0; j--) {
			
			board += '|';
			
			for (let i = 0; i < 8; i++) {
				
				const ind = i + j*8;
				
				const piece = this.position.cells[ind];
				
				const highlightChars = legalMoves.includes(ind) ? '*' : ' ';
				
				board += highlightChars + pieceToString(piece) + highlightChars + '|';
			}
			
			board += '\n' + horizontalGrid;
		}
		
		board +=  '\n' + legalMoves + '```';
		
		return board;
	}
	
	getChecks(color) {
		
		return this.position.getChecks(color);
	}
	
	isWhiteToMove() {
		
		return this.position.isWhiteToMove;
	}
}

function pieceToString(piece) {
	
	const colorlessPiece = Piece.getPieceType(piece);
	const pieceColor = Piece.getPieceColor(piece);
	
	let pieceString;
	
	switch(colorlessPiece) {
		
		case Piece.EMPTY:
			pieceString = '  ';
			break;
		
		case Piece.PAWN:
			pieceString = 'P ';
			break;
		
		case Piece.KNIGHT:
			pieceString = 'N ';
			break;
		
		case Piece.BISHOP:
			pieceString = 'B ';
			break;
		
		case Piece.ROOK:
			pieceString = 'R ';
			break;
		
		case Piece.QUEEN:
			pieceString = 'Q ';
			break;
		
		case Piece.KING:
			pieceString = 'K ';
			break;
		
		default:
			pieceString = 'P?';
	}
	
	if (pieceColor == Piece.BLACK) {
		
		pieceString = pieceString.toLowerCase();
	}
	else if (pieceColor != Piece.WHITE && colorlessPiece != Piece.EMPTY) { // Redundant debug, in case of messed up color bits
		
		pieceString = 'C?';
	}
	
	return pieceString;
}