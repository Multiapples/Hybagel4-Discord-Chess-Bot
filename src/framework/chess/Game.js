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
		
		let board = '\n```';
		
		for (let j = 7; j >= 0; j--) {
			
			for (let i = 0; i < 8; i++) {
				
				const checkeredSquareChar = (i + j) % 2 == 0 ? '-' : ' ';
				
				const cell = this.position.cells[i + j*8]
				
				const colorlessPiece = Piece.getPieceType(cell);
				const pieceColor = Piece.getPieceColor(cell);
				
				let square;
				
				switch(colorlessPiece) {
					
					case Piece.EMPTY:
						square = checkeredSquareChar;
						break;
					
					case Piece.PAWN:
						square = 'P';
						break;
					
					case Piece.KNIGHT:
						square = 'N';
						break;
					
					case Piece.BISHOP:
						square = 'B';
						break;
					
					case Piece.ROOK:
						square = 'R';
						break;
					
					case Piece.QUEEN:
						square = 'Q';
						break;
					
					case Piece.KING:
						square = 'K';
						break;
					
					default:
						square = '??';
				}
				
				if (pieceColor == Piece.BLACK) {
					
					square = square.toLowerCase();
				}
				
				board += square + checkeredSquareChar;
			}
			
			board += '\n';
		}
		
		board += '```';
		
		return board;
	}
}