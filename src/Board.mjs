import './Block.mjs'
export class Board {
  width;
  height;
  board;
  fallingBlock;

  constructor(width, height) {
    
    this.width = width;
    this.height = height;
    this.board = this.initializeBoardArray(this.width, this.height);
    this.fallingBlock = false
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
    if (!this.fallingBlock ){
      console.log('Drop():');
      this.fallingBlock = true;
      let mid = Math.floor(this.width / 2);
      this.board[0][mid] = 'X';
      this.printBoard();
    } else {
     throw 'already falling';
    }
  }

  tick() {
    console.log('Tick():')
    for (let row in this.board) {
      var currentRow = this.board[row];
      var index = this.board[row].indexOf('X');
      if (~index) {
        let next = parseInt(row + 1);
        console.log('ROW:', this.board[row]);
        console.log('NEX:', this.board[next]);
        this.board[row][index] = '.';
        this.board[next][index] = 'X';
        break;
      }
      this.printBoard();
    }
  }

  printBoard() {
    for (let row in this.board) {
      console.log('\t' , this.board[row]);
    }
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
