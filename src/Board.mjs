import './Block.mjs'
export class Board {
  boardboardWidth;
  height;
  board;
  blockIsFalling;

  constructor(boardWidth, height) {
    
    this.boardWidth = boardWidth;
    this.height = height;
    this.board = this.initializeBoardArray(this.boardWidth, this.height);
    this.blockIsFalling = false
  }

  toString() {
    let string = '';
    for (let i = 0; i < this.height; i++) {
      for (let j =0; j < this.boardWidth; j++) {
        string += this.board[i][j];
      }
      string += '\n';
    }
    return string;
  }

  drop( block ) {
    if (block.constructor.name === "Block") {
    if (!this.blockIsFalling ){
      this.blockIsFalling = true;
      let mid = Math.floor(this.boardWidth / 2);
      this.board[0][mid] = 'X';
    } else {
     throw 'already falling';
    }
  } else {
    if (!this.blockIsFalling ){
      
      this.blockIsFalling = true;
      let boardCenter = Math.floor(this.boardWidth / 2);
      let fallingBlockWidth = block.orientations[0].width
      let fallingBlockStartIndex = boardCenter - Math.floor(fallingBlockWidth / 2) -1 
      console.log('Start point of block', fallingBlockStartIndex)
      for (let row= 0; row < block.rows().length; row++) {
        for (let col = 0; col < fallingBlockWidth; col++) {
          console.log('Bug at', row, fallingBlockStartIndex + col)
          this.board[row][fallingBlockStartIndex + col] = block.cellAtIndex(row,col)
        }
      }
      
    } else {
     throw 'already falling';
    }

  }
}

  tick() {
    for (let row in this.board) {
      var currentRow = this.board[row];
      var index = this.board[row].indexOf('X');
      if (~index) {
        let next = parseInt(row + 1);
        this.board[row][index] = '.';
        this.board[next][index] = 'X';
        break;
      }
      console.log('TICK:')
      this.printBoard();
    }
  }

  printBoard() {
    console.log("\n")
    for (let row in this.board) {
      console.log('\t' , this.board[row]);
    }
    console.log("\n")
  }

  initializeBoardArray(boardWidth, height) {
    let boardArray = [];
    let row = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < boardWidth; j++) {
        row.push('.');
      }
      boardArray[i] = row;
      row = [];
    }
   return boardArray;
  }



}
