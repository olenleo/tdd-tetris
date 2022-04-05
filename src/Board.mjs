import './Block.mjs'
export class Board {
  width;
  height;
  board;
  blockIsFalling;

  constructor(width, height) {
    
    this.width = width;
    this.height = height;
    this.board = this.initializeBoardArray(this.width, this.height);
    this.blockIsFalling = false
  }

  toString() {
    let string = '';
    for (let i = 0; i < this.height; i++) {
      for (let j =0; j < this.width; j++) {
        string += this.board[i][j];
      }
      string += '\n';
    }
    return string;
  }

  drop() {
    if (!this.blockIsFalling ){
      this.blockIsFalling = true;
      let mid = Math.floor(this.width / 2);
      this.board[0][mid] = 'X';
    } else {
     throw 'already falling';
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

  initializeBoardArray(width, height) {
    let boardArray = [];
    let row = [];
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        row.push('.');
      }
      boardArray[i] = row;
      row = [];
    }
   return boardArray;
  }



}
