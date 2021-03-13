module.exports = class ChessPosition {
	
	constructor() {
		
		this.cells = new Array(64); // Starts at a1 and goes rank by rank.
	}
	
	wipe() {
		
		this.cells.fill(0);
	}
}