const Piece = require('./Piece.js');

const slidingOffsets = [8, 1, -8, -1, 7, 9, -7, -9]; //N, E, S, W, NW, NE, SE, SW
const knightOffsets = [6, 15, 17, 10, -6, -15, -17, -10]; // NWW, NNW, NNE, NEE, SEE, SSE, SSW, SWW

const squaresUntilEdge = new Array(64);

for (let j = 0; j < 8; j++) {
	
	for (let i = 0; i < 8; i++) {
		
		const N = 7 - j;
		const S = j;
		const E = 7 - i;
		const W = i;
		
		localUntilEdge = [
			N,
			E,
			S,
			W,
			Math.min(N, W),
			Math.min(N, E),
			Math.min(S, E),
			Math.min(S, W),
		]; //N, E, S, W, NW, NE, SE, SW
		
		squaresUntilEdge.push(localUntilEdge);
	}
}

module.exports = class Position {
	
	constructor() {
		
		this.cells = new Array(64); // Starts at a1 and goes rank by rank.
	}
	
	wipe() {
		
		this.cells.fill(Piece.EMPTY);
	}
	
	getPieceLegalMoves(cellIndex) {
		
		const piece = this.cells[cellIndex];
		
		const colorlessPiece = Piece.getPieceType(piece);
		
		if (colorlessPiece == Piece.EMPTY) {
			
			return [];
		}
		
		const pieceColor = Piece.getPieceColor(piece);
		
		if      (colorlessPiece == Piece.QUEEN) {
			
			
		}
		else if (colorlessPiece == Piece.ROOK) {
			
			
		}
		else if (colorlessPiece == Piece.BISHOP) {
			
			
		}
		else if (colorlessPiece == Piece.KNIGHT) {
			
			
		}
		else if (colorlessPiece == Piece.PAWN) {
			
			
		}
		else if (colorlessPiece == Piece.KING) {
			
			return this.getLegalMovesKing(cellIndex, pieceColor);
		}
		
		return [];
	}
	
	getLegalMovesKing(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		// Move one space in each direction.
		// If it is not a friendly square, you can move/capture.
		for (let i = 0; i < slidingOffsets.length; i++) {
			
			const offset = slidingOffsets[i];
			
			const targetSquare = cellIndex + offset;
			
			if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
				
				continue; // Blocked by a friendly piece, king cannot move there.
			}
			
			legalMoves.push(targetSquare);
		}
		
		return legalMoves;
	}
}