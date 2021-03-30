const Piece = require('./Piece.js');

const slidingOffsets = [8, 1, -8, -1, 7, 9, -7, -9]; //N, E, S, W, NW, NE, SE, SW
const knightOffsets = [6, 15, 17, 10, -6, -15, -17, -10]; // NWW, NNW, NNE, NEE, SEE, SSE, SSW, SWW

const squaresUntilEdge = [];
const knightMoveable = [];

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
		
		const NWW = i-2 >= 0 & j+1 <  8;
		const NNW = i-1 >= 0 & j+2 <  8;
		const NNE = i+1 <  8 & j+2 <  8;
		const NEE = i+2 <  8 & j+1 <  8;
		const SEE = i+2 <  8 & j-1 >= 0;
		const SSE = i+1 <  8 & j-2 >= 0;
		const SSW = i-1 >= 0 & j-2 >= 0;
		const SWW = i-2 >= 0 & j-1 >= 0;
		
		localMoveable = [
			NWW,
			NNW,
			NNE,
			NEE,
			SEE,
			SSE,
			SSW,
			SWW,
		];
		
		knightMoveable.push(localMoveable);
	}
}

module.exports = class Position {
	
	constructor() {
		
		this.cells = new Array(64); // Starts at a1 and goes rank by rank.
		this.isWhiteToMove = true;
		
	}
	
	wipe() {
		
		this.cells.fill(Piece.EMPTY);
	}
	
	move(startSquare, endSquare) {
		
		this.isWhiteToMove = !this.isWhiteToMove;
		
		this.cells[endSquare] = this.cells[startSquare];
		this.cells[startSquare] = Piece.EMPTY;
	}
	
	getPieceLegalMoves(cellIndex) {
		
		const piece = this.cells[cellIndex];
		
		const colorlessPiece = Piece.getPieceType(piece);
		
		if (colorlessPiece == Piece.EMPTY) {
			
			return [];
		}
		
		const pieceColor = Piece.getPieceColor(piece);
		
		if      (colorlessPiece == Piece.PAWN) {
			
			return this.getLegalMovesPawn(cellIndex, pieceColor);
		}
		else if (colorlessPiece == Piece.KNIGHT) {
			
			return this.getLegalMovesKnight(cellIndex, pieceColor);
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
	
	getChecks(pieceColor) {
		
		// Find the king. Ideally this should be replaced with a lookup of the king's index from a map.
		let king;
		
		for (let i = 0; i < 64; i++) { 
			
			if (this.cells[i] == (Piece.KING | pieceColor)) {
				
				king = i;
				break;
			}
		}
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		const checks = [];
		
		// Search in all directions for checks by sliding pieces.
		for (let dir = 0; dir < 8; dir++) {
						
			let targetSquare = king;

			const offset = slidingOffsets[dir];
			
			for (let mag = 0; mag < squaresUntilEdge[king][dir]; mag++) {
				
				targetSquare += offset;
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
					
					break; // Ray ends at a friendly piece, no checks from this direction.
				}
				
				if (Piece.getPieceColor(this.cells[targetSquare]) == enemyColor) {
					
					// Ray ends at an enemy piece.
					// Make sure that the enemy can actually move to check the king.
					const attackingPiece = Piece.getPieceType(this.cells[targetSquare]);
					
					if (attackingPiece == Piece.QUEEN) {
						
						checks.push(targetSquare);
					}
					
					if (dir < 4) { // First four directions are cardinal directions.
						
						if (attackingPiece == Piece.ROOK) {
							
							checks.push(targetSquare);
						}
					}
					else { // Last four directions are diagonal directions.
						
						if (attackingPiece == Piece.BISHOP) {
							
							checks.push(targetSquare);
						}
					}
					
					break; // Ray blocked by an enemy piece.
					       // No checks possible further down this direction, so move on. 
				}
			}
		}
		
		// Search for knights checking the king.
		for (let i = 0; i < 8; i++) {
			
			if (!knightMoveable[king][i]) {
				
				continue; // Square would be off the board, go to next direction.
			}
			
			const offset = knightOffsets[i];
			
			const targetSquare = king + offset;
			
			if (this.cells[targetSquare] == (Piece.KNIGHT | enemyColor)) {
				
				checks.push(targetSquare);
			}
		}
		
		// Search for pawns checking the king.
		const enemyPawnMovementDir = pieceColor == Piece.WHITE ? -1 : 1;
		
		if (this.cells[king - 8*enemyPawnMovementDir + 1] == (Piece.PAWN | enemyColor)) {
			
			checks.push(king - 8*enemyPawnMovementDir + 1);
		}
		
		if (this.cells[king - 8*enemyPawnMovementDir - 1] == (Piece.PAWN | enemyColor)) {
			
			checks.push(king - 8*enemyPawnMovementDir - 1);
		}
		
		return checks;
	}
	
	getLegalMovesPawn(cellIndex, pieceColor) {
		
		// Return no legal moves if the pawn is on the 1st or 8th rank,
		// though there should be no cases where a pawn is ever on those ranks
		if (cellIndex < 8 || cellIndex >= 56) {
			
			return [];
		}
		
		const legalMoves = [];
		
		const isWhite = pieceColor == Piece.WHITE;
		const homeRank = isWhite ? 1 : 6;
		
		const offset = isWhite ? 8 : -8;
		const targetSquare = cellIndex + offset;
		
		// Add the cell immediately infront of the pawn if it is empty.
		if (this.cells[targetSquare] == Piece.EMPTY) {
			
			legalMoves.push(targetSquare);
			
			// Add the cell 2 spaces infront of the pawn if it is empty and the pawn is on its home rank.
			// (And also the pawn is able to cross the first square);
			if (Math.floor(cellIndex / 8) == homeRank && this.cells[cellIndex + 2*offset] == Piece.EMPTY) {
				
				legalMoves.push(cellIndex + 2*offset);
			}
		}
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		// Add the cells 1 space forwards and 1 to the left and right of that if there is an enemy piece there,
		// and that cell is not off the edge.
		if (Piece.getPieceColor(this.cells[targetSquare - 1]) == enemyColor) {
			
			if (squaresUntilEdge[cellIndex][3] != 0) {
				
				legalMoves.push(targetSquare - 1);
			}
		}
		if (Piece.getPieceColor(this.cells[targetSquare + 1]) == enemyColor) {
			
			if (squaresUntilEdge[cellIndex][1] != 0) {
				
				legalMoves.push(targetSquare + 1);
			}
		}
		
		return legalMoves;
	}
	
	getLegalMovesKnight(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		// Try to move to each square a knight's move away.
		// If it is not a friendly square, you can move/capture.
		for (let i = 0; i < 8; i++) {
			
			if (!knightMoveable[cellIndex][i]) {
				
				continue; // Knight would move off the board, go to next direction.
			}
			
			const offset = knightOffsets[i];
			
			const targetSquare = cellIndex + offset;
			
			if (Piece.getPieceColor(this.cells[targetSquare]) == pieceColor) {
				
				continue; // Blocked by a friendly piece, knight cannot move there.
			}
			
			legalMoves.push(targetSquare);
		}
		
		return legalMoves;
	}
	
	getLegalMovesBishop(cellIndex, pieceColor) {
		
		const legalMoves = [];
		
		const enemyColor = Piece.getOppositeColor(pieceColor);
		
		// For each direction, record each space until the end of the board or until
		// blocked by a friendly piece.
		for (let dir = 4; dir < 8; dir++) {
			
			let targetSquare = cellIndex;
			
			const offset = slidingOffsets[dir];
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
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
				
			const offset = slidingOffsets[dir];
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
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
			
			const offset = slidingOffsets[dir];
			
			for (let mag = 0; mag < squaresUntilEdge[cellIndex][dir]; mag++) {
				
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
			
			if (squaresUntilEdge[cellIndex][i] == 0) {
				
				continue;
			}
			
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