import { shapeToString } from "./shapes.mjs";

const EMPTY = ".";

class Point {

  row;
  col;

  constructor(row,col) {
    this.row = row;
    this.col = col;
  }
}

class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape,row,col) {
    //console.log('Hello. I am \nMovableShape\nConstructor:\n\n')
    this.#shape= shape;
    this.#row = row;
    this.#col = col;
    //console.log('I recieve ', this.#shape)
  }

  filledBlocks() { 
    const points = [];
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EMPTY) {
          points.push(new Point(row, col));
        }
      }
    }
    return points;
  }
  moveDown () {
    return new MovableShape(this.#shape, this.#row+1, this.#col);
  }

  width() {
    return this.#shape.width();
  }

  height() {
    return this.#shape.height();
  }

  blockAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }
}


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
    this.#fallingBlock = new MovableShape(block, 0,  Math.floor((this.#width - block.width()) / 2))
    this.#fallingRow = 0;
    this.#fallingCol = Math.floor((this.#width - block.width()) / 2);
  }
  
  tick() {
    console.log('TICK')
    console.log(this.toString())
    if (!this.hasFalling()) {
      return;
    }
    const test = this.#fallingBlock.moveDown()
    if (this.#fallingWouldHitFloor(test) || this.#fallingWouldHitImmobile(test)) {
      this.#stopFalling();
    } else {
      this.#fallingBlock = test
      this.#fallingRow++;
    }
  }

  #fallingWouldHitFloor( block ) {
    for (const point of block.filledBlocks()) {
      if (point.row >= this.#height) {
        return true;
      }
    }
    return false;
  }

  #fallingWouldHitImmobile( block ) {
    if (block.height() === 1) {
      const nextRow = this.#fallingRow + 1;
      return this.#immobile[nextRow][this.#fallingCol] !== EMPTY
    }
    for (const point of block.filledBlocks()) {
      if (point.row + 1 < this.#height) {
         return this.#immobile[point.row + 1][point.col] !== EMPTY
      } 
    }
    return false;
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#fallingBlock = null;
  }
  
  height() {
    return this.#height;
  }
  
  width() {
    return this.#width;
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
 

  hasFalling() {
    return this.#fallingBlock !== null;
  }

  blockAt(row, col) {
    if (this.#fallingBlock) {
      const ret = this.#fallingBlock.blockAt(row,col)
      if (ret !== EMPTY) {
        return ret;
      }
    }
    return this.#immobile[row][col];
  }


  toString() {
  return shapeToString(this)
  }
}