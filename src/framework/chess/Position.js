const Piece = require('./Piece.js');

const slidingOffsets = [8, 1, -8, -1, 7, 9, -7, -9]; //N, E, S, W, NW, NE, SE, SW
const knightOffsets = [6, 15, 17, 10, -6, -15, -17, -10]; // NWW, NNW, NNE, NEE, SEE, SSE, SSW, SWW

const squaresUntilEdge = [];

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
		
		if      (colorlessPiece == Piece.PAWN) {
			
			
		}
		else if (colorlessPiece == Piece.KNIGHT) {
			
			
		}
		else if (colorlessPiece == Piece.BISHOP) {
			
			return this.getLegalMovesBishop(cellIndex, pieceColor);
		}
		else if (colorlessPiece == Piece.ROOK) {
			
			return this.getLegalMovesRook(cellIndex, pieceColor);
		}
		else if (colorlessPiece == Piece.QUEEN) {
			
			return this.getLegalMovesQueen(cellIndex, pieceColor);
		}
		else if (colorlessPiece == Piece.KING) {
			
			return this.getLegalMovesKing(cellIndex, pieceColor);
		}
		
		return [];
	}
	
	getLegalMovesBishop(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		// For each direction, record each space until the end of the board or until
		// blocked by a friendly piece.
		for (let dir = 4; dir < 8; dir++) {
			
			let targetSquare = cellIndex;
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
				const offset = slidingOffsets[dir];
				
				targetSquare += offset;
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
					
					break; // Blocked by a friendly piece,
					       // bishop cannot move any further in that direction.
				}
				
				legalMoves.push(targetSquare);
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == enemyColor) {
					
					break; // Captured an enemy piece,
					       // bishop cannot move any further in that direction.
				}
			}
		}
		
		return legalMoves;
	}
	
	getLegalMovesRook(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		// For each direction, record each space until the end of the board or until
		// blocked by a friendly piece.
		for (let dir = 0; dir < 4; dir++) {
			
			let targetSquare = cellIndex;
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
				const offset = slidingOffsets[dir];
				
				targetSquare += offset;
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
					
					break; // Blocked by a friendly piece,
					       // bishop cannot move any further in that direction.
				}
				
				legalMoves.push(targetSquare);
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == enemyColor) {
					
					break; // Captured an enemy piece,
					       // bishop cannot move any further in that direction.
				}
			}
		}
		
		return legalMoves;
	}
	
	getLegalMovesQueen(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		// For each direction, record each space until the end of the board or until
		// blocked by a friendly piece.
		for (let dir = 0; dir < 8; dir++) {
			
			let targetSquare = cellIndex;
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
				const offset = slidingOffsets[dir];
				
				targetSquare += offset;
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
					
					break; // Blocked by a friendly piece,
					       // bishop cannot move any further in that direction.
				}
				
				legalMoves.push(targetSquare);
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == enemyColor) {
					
					break; // Captured an enemy piece,
					       // bishop cannot move any further in that direction.
				}
			}
		}
		
		return legalMoves;
	}
	
	getLegalMovesKing(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		// Move one space in each direction.
		// If it is not a friendly square, you can move/capture.
		for (let i = 0; i < 8; i++) {
			
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