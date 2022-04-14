import './Block.mjs'
export class Board {
  boardWidth;
  height;
  board;
  blockIsFalling;
  fallingBlock;
  fallingBlockCenter;
  fallingBlockStartIndex;
  fallingBlockHeight;
  type;
  

  constructor(boardWidth, height) {
    
    this.boardWidth = boardWidth;
    this.height = height;
    this.board = this.initializeBoardArray(this.boardWidth, this.height);
    this.blockIsFalling = false
    this.fallingBlockWidth = 0
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
      this.type = "Block"
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
      this.fallingBlock = block;
      let boardCenter = Math.floor(this.boardWidth / 2);
      console.log('WIDTH:', block.orientations[0].width)
      this.fallingBlockWidth = block.orientations[0].width;
      this.fallingBlockHeight = block.rows().length
      this.fallingBlockCenter = {x : boardCenter, y : Math.floor(this.fallingBlockWidth / 2)}
      console.log('center: ', this.fallingBlockCenter)

      this.fallingBlockStartIndex = boardCenter - Math.floor(this.fallingBlockWidth / 2) - 1;
      console.log('Start point of block', this.fallingBlockStartIndex);
      
      /** 
      for (let row= 0; row < block.rows().length; row++) {
        for (let col = 0; col < this.fallingBlockWidth; col++) {
          this.board[row][fallingBlockStartIndex + col] = block.cellAtIndex(row,col)
        }
      }
      */
     this.drawTetrominoFrom(this.fallingBlockCenter.y, this.fallingBlockCenter.x)
    } else {
     throw 'already falling';
    }

  }
}
/**
 * tick() {
    for (let row in this.board) {
      var currentRow = this.board[row];

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

 */
  tick() {
    console.log('TICK start')
    console.log('Dimensions: ', this.fallingBlockWidth, this.fallingBlockHeight)
    console.log('Board Dimensions: ', this.height, this.boardWidth)
    if (this.type === "Block") {
    for (let row in this.board) {
      var index = this.board[row].indexOf('X');
      if (~index) {
        let next = parseInt(row + 1);
        this.board[row][index] = '.';
        this.board[next][index] = 'X';
        break;
        }
      }
    } else {
      for (let row in this.board) {
        let next = parseInt(this.fallingBlockCenter.y + 1)
        console.log('SUM = ', next)
        if (next <= parseInt(row)) {
          // check drop condition
          if (this.fallingBlock.botRow().forEach(cell => console.log('cell', cell))) {
            this.drawTetrominoFrom(row - 1, this.fallingBlockCenter.x)
            return;
          }
          this.fallingBlockCenter.y = next
          this.drawTetrominoFrom(row , this.fallingBlockCenter.x)
          this.printBoard()
        }
      }
    }     
  }
    /** 
      for (let row= 0; row < block.rows().length; row++) {
        for (let col = 0; col < this.fallingBlockWidth; col++) {
          this.board[row][fallingBlockStartIndex + col] = block.cellAtIndex(row,col)
        }
      }
    */
  drawTetrominoFrom(y, x) {
    console.log('Block centre at ', y, x)
    this.fallingBlockStartIndex = x - Math.floor(this.fallingBlockWidth / 2) - 1;
      for (let row = 0; row < this.fallingBlockHeight; row++) {
        for (let col = 0; col < this.fallingBlockWidth; col++) {
          this.board[y-1 + row][this.fallingBlockStartIndex + col] = this.fallingBlock.cellAtIndex(row, col)
          }    
      }
  }  

  printBoard() {
  
    console.log(this.toString())  
    
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
  
  blockCanDrop() {                                                               
    for (let i = 0; i < this.fallingBlockWidth; i++) {
      
    }
  }

  cellBelowIsEmpty( row, col ) {
    return (this.board[row+1][col] === "." || row + 1 === this.height)
  }
}
