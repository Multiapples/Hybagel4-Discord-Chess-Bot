module.exports = class Piece {
	
	static EMPTY  = 0;
	static WHITE  = 1;
	static BLACK  = 2;
	static PAWN   = 4;
	static KNIGHT = 8;
	static BISHOP = 16;
	static ROOK   = 32;
	static QUEEN  = 64;
	static KING   = 128;
	
	static getPieceType(piece) {
		
		return piece & (255 ^ (this.BLACK | this.WHITE)); // bitmask out the white and black values
	}
	
	static getPieceColor(piece) {
		
		return piece & (this.WHITE | this.BLACK) // bitmask only the white and black values
	}
	
	static getOppositeColor(color) {
		return (this.WHITE | this.BLACK) ^ color;
	}
}