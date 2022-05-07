import { shapeToString } from "./shapes.mjs";
import { NewRotatingShape } from "./NewRotatingShape.mjs";
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

  setCol(adj) {
    this.#col += adj;

  }
  filledBlocks() { 
    const points = [];
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
      for (let col = this.#col; col < this.#col + this.#shape.getWidth(); col++) {
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
  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }

  moveRight( ) {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }

  rotateLeft() {
    return new MovableShape(this.#shape.rotateLeft(), this.#row, this.#col)
  }

  rotateRight() {
    return new MovableShape(this.#shape.rotateRight(), this.#row, this.#col)
  }
  getWidth() {
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
      col < this.#col + this.#shape.getWidth()
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
    this.#fallingBlock = new MovableShape(block, 0,  Math.floor((this.#width - block.getWidth()) / 2))
    this.#fallingRow = 0;
    this.#fallingCol = Math.floor((this.#width - block.getWidth()) / 2);
  }
  
  tick() {
    if (!this.hasFalling()) {
      return;
    }
    
    this.moveDown()
  }

  rotateLeft() {
    let test = this.#fallingBlock.rotateLeft()
    let adj = this.rotationWouldReachOutsideBoard(test);
    if (adj !== 0) {
      //console.log('Adjustment: ', adj)
    }
    if (!this.collidesLeft(test) && adj === 0) {
      this.#fallingBlock = test;
    }
    
    else if (adj < 0) {
      adj = Math.abs(adj)
      test.setCol(adj)
      this.#fallingBlock = test;
    }
    else if (adj > 0) {
      this.#fallingBlock = test;
      test.setCol(this.#width - adj - 1)
    }
  }
  rotationWouldReachOutsideBoard( test ) {
      for (const point of test.filledBlocks()) {
        if (point.col < 0) {
          return (point.col);
        }
        if (point.col >= this.#width) {
          return (point.col);
        }
      }
      return 0;
  }

  rotateRight() {
    const test = this.#fallingBlock.rotateRight()
    if (!this.collidesRight(test)) {
      this.#fallingBlock = test;
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

  stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.getWidth(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#fallingBlock = null;
  }
  
  height() {
    return this.#height;
  }
  
  getWidth() {
    return this.#width;
  }

 
  moveLeft() {
    if (!this.hasFalling) { 
      return;
    }
    const test = this.#fallingBlock.moveLeft()
    if (!this.collidesLeft(test)) {
      this.#fallingCol--;
      this.#fallingBlock = test;
    }
  }

  collidesLeft( block ) {
    for (const point of block.filledBlocks()) {
      if (point.col < 0 || this.#immobile[point.row][point.col] !== EMPTY) {
        return true;
      }
    }
    return false;
  }
  collidesRight( block ) {
    for (const point of block.filledBlocks()) {
      if (point.col +1 > this.#width || this.#immobile[point.row][point.col] !== EMPTY) {
        return true;
      }
    }
    return false;
  }

  moveRight() {
    if (!this.hasFalling) { 
      return;
    }
    const test = this.#fallingBlock.moveRight()
    if (!this.collidesRight(test)) {
      this.#fallingCol++;
      this.#fallingBlock = test;
    }
  }

  moveDown() {
    if (!this.#fallingBlock) {
      return;
    }
    const test = this.#fallingBlock.moveDown()
    if (this.#fallingWouldHitFloor(test) || this.#fallingWouldHitImmobile(test)) {
      this.stopFalling();
    } else {
      this.#fallingBlock = test
      this.#fallingRow++;
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

  setImmobileState ( array ) {
    for (let row = 0; row < this.#height; row++) {
        this.#immobile[row] = array[row];
    }
  } 

  toString() {
  return shapeToString(this)
  }

}