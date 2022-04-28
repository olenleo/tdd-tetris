import { shapeToString } from "./shapes.mjs";

const EMPTY = ".";

export class Board {
  #width;
  #height;
  #fallingBlock = null;
  #fallingRow;
  #fallingCol;
  #immobile;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EMPTY);
    }
  }

  drop(block) {
    if (this.#fallingBlock) {
      throw new Error("another block is already falling");
    }
    this.#fallingBlock = block;
    this.#fallingRow = 0;
    this.#fallingCol = Math.floor((this.#width - block.width()) / 2);
  }

  moveLeft() {
    if (!this.hasFalling) { 
      return;
    } else if (this.#fallingCol +this.#fallingBlock.nrOfEmptyRowsLeft() > 0) {
      this.#fallingCol -= 1;
    }
  }

  moveRight() {
    if (this.#fallingCol + this.#fallingBlock.nrOfEmptyRowsRight() < this.#width - 1) {
      this.#fallingCol += 1;
    } 
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }
    if (this.collidesWithBot() || this.collidesWithImmobile()) {
      this.#stopFalling();
    } else {
      this.#fallingRow++;
    }
  }

  
  height() {
    return this.#height;
  }

  width() {
    return this.#width;
  }

  blockAt(row, col) {
    if (
      this.#fallingBlock &&
      row >= this.#fallingRow &&
      row < this.#fallingRow + this.#fallingBlock.height() &&
      col >= this.#fallingCol &&
      col < this.#fallingCol + this.#fallingBlock.width()
    ) {
      return this.#fallingBlock.blockAt(
        row - this.#fallingRow,
        col - this.#fallingCol
      );
    } else {
      return this.#immobile[row][col];
    }
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    this.moveDown()
  }

  collidesWithBot() {
    let botRow = this.#fallingBlock.nrOfEmptyRows()
    return this.#fallingRow + this.#fallingBlock.height() >= this.#height + botRow;
  }
  
  collidesWithImmobile() {
      let botRow = this.#fallingBlock.nrOfEmptyRows();
      let nextRow = this.#fallingRow + 1;
      let nextCol = this.#fallingCol;
      let s = "";
      let startIndex =  nextCol - Math.floor(this.#fallingBlock.width() / 2) + 1;
      for (let i = 0; i < this.#fallingBlock.width(); i++) {
       if (this.#immobile[nextRow + botRow ][startIndex + i] !== EMPTY) {
         return true;
       }
           
      }
      return this.#immobile[this.#fallingRow + 1][nextCol] !== EMPTY;
    }
  
  #stopFalling() {
    //this.#immobile[this.#fallingRow][this.#fallingCol] = this.#fallingBlock.blockAt(0,0);
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        if (this.blockAt(row,col) != EMPTY) {
          this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    }
    this.#fallingBlock = null;
  }

  hasFalling() {
    return this.#fallingBlock !== null;
  }

  toString() {
  return shapeToString(this)
  }
}