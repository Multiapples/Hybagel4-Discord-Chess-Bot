const { createCanvas } = require('canvas');

const Position = require('./Position.js');
const Piece = require('./Piece.js');

module.exports = class Game {
	
	static sprites;
	
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
		
		const canvas = createCanvas(30*8, 30*8);
		const context = canvas.getContext('2d');
		
		context.drawImage(sprites.get('board'), 0, 0);
		
		for (let j = 0; j < 8; j++) {
			
			for (let i = 0; i < 8; i++) {
				
				const img = sprites.get(pieceToName(this.position.cells[i + j*8]));
				
				if (!img) {
					
					continue;
				}
				
				context.drawImage(img, i*30, (8-1-j)*30);
			}
		}
		
		return canvas.toBuffer();
	}
	
	move(startSquare, endSquare) {
		
		this.position.move(startSquare, endSquare);
	}
	
	getPieceLegalMoves(cellIndex) {
		
		const legalMoves = this.position.getPieceLegalMoves(cellIndex);
		
		const canvas = createCanvas(30*8, 30*8);
		const context = canvas.getContext('2d');
		
		context.drawImage(sprites.get('board'), 0, 0);
		
		for (let j = 0; j < 8; j++) {
			
			for (let i = 0; i < 8; i++) {
				
				const img = sprites.get(pieceToName(this.position.cells[i + j*8]));
				
				if (img) {
					
					context.drawImage(img, i*30, (8-1-j)*30);
				}
				
				if (legalMoves.includes(i + j*8)) {
					
					context.drawImage(sprites.get('legal_overlay'), i*30, (8-1-j)*30);
				}
			}
		}
		
		return canvas.toBuffer();
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

function pieceToName(piece) {
	
	const colorlessPiece = Piece.getPieceType(piece);
	const pieceColor = Piece.getPieceColor(piece);
	
	let pieceString;
	
	if (pieceColor == Piece.BLACK) {
		
		pieceString = 'black';
	}
	else if (pieceColor == Piece.WHITE) {
		
		pieceString = 'white';
	}
	else {
		
		pieceString = 'colorless';
	}
	
	pieceString += '_';
	
	switch(colorlessPiece) {
		
		case Piece.EMPTY:
			pieceString += 'empty';
			break;
		
		case Piece.PAWN:
			pieceString += 'pawn';
			break;
		
		case Piece.KNIGHT:
			pieceString += 'knight';
			break;
		
		case Piece.BISHOP:
			pieceString += 'bishop';
			break;
		
		case Piece.ROOK:
			pieceString += 'rook';
			break;
		
		case Piece.QUEEN:
			pieceString += 'queen';
			break;
		
		case Piece.KING:
			pieceString += 'king';
			break;
		
		default:
			pieceString += '';
	}
	
	return pieceString;
}