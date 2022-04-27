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

  tick() {
    if (this.collidesWithBot() || this.collidesWithImmobile()) {
      this.#stopFalling();
    } else {
      this.#fallingRow++;
    }
  }
  collidesWithBot() {
    
    return this.#fallingRow + 1 >= this.#height;
  }

  collidesWithImmobile() {
      // if Immobile[row+1][col] isEmpty etc
      console.log('BONK')
      let nextRow = this.#fallingRow + 1;
      let nextCol = this.#fallingCol;
      return this.#immobile[nextRow][nextCol] !== EMPTY;
    }

  #stopFalling() {
    this.#immobile[this.#fallingRow][this.#fallingCol] = this.#fallingBlock.blockAt(0,0);
    this.#fallingBlock = null;
  }

  hasFalling() {
    return this.#fallingBlock !== null;
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        if (
          this.#fallingBlock &&
          row === this.#fallingRow &&
          col === this.#fallingCol
        ) {
          s += this.#fallingBlock.blockAt(0, 0);
        } else {
          s += this.#immobile[row][col];
        }
      }
      s += "\n";
    }
    return s;
  }
}