import {RotatingShape} from "./RotatingShape.mjs";

export class Tetromino {
  
  static T_SHAPE = new Tetromino(
    `.T.
     TTT
     ...`, 0 ,4)
  static I_SHAPE = new Tetromino(
    `.....
     .....
     IIII.
     .....
     .....`, 0, 2);
  static O_SHAPE = new Tetromino(
    `.OO
     .OO
     ...`,0,1)
  
  static Z_SHAPE = new Tetromino(
    `ZZ.
     .ZZ
     ...`, 0, 2)

  static S_SHAPE = new Tetromino(
    `.SS
     SS.
     ...`, 0, 2)

  static J_SHAPE = new Tetromino(
    `....
     JJJ.
     ..J.
     ....
     `, 0, 4)
    
    static L_SHAPE = new Tetromino(
    `....
     ..L.
     LLL.
     ....
     `, 0, 4)
  orientation
  orientations
  

  constructor(shape, orientation, orientations) {
    if (shape === null) {
      this.orientation = orientation
      this.orientations = orientations
    } else {
      const newShape = new RotatingShape(shape);
      this.orientation = orientation;
      this.orientations = [
        newShape,
        newShape.rotateRight(),
        newShape.rotateRight().rotateRight(),
        newShape.rotateRight().rotateRight().rotateRight()
      ].slice(0, orientations)
    }
  }
  toString() {
    return this.orientations[this.orientation].toString()
  }

  rotateRight() {
    let setOrientation = (this.orientation === this.orientations.length - 1 ? 0 : this.orientation + 1)
    return new Tetromino(null, setOrientation, this.orientations)
  }

  rotateLeft() {
    let setOrientation = (this.orientation === 0 ? this.orientations.length - 1 : this.orientation - 1)
    return new Tetromino(null,setOrientation, this.orientations)
  }

  rows() {
    return this.orientations[this.orientation].originalMatrix
  }

  shape() {
    return this.orientations[this.orientation]
  }
  /**
   * Method references 'RotatingShape' matrix
   * @param {*} row 
   * @param {*} col 
   * @returns RotatingShape -> OriginalMatrix[row][col]
   */
  blockAt(row, col) {
    return this.shape().blockAt(row, col);
  }

  cellAtIndex(row, column) {
    return this.orientations[this.orientation].originalMatrix[row][column]
  }

  /** 
   * Returns number of empty rows from bottom
   */
  nrOfEmptyRows() {
    let ret = 0;
    for (let i = this.height() - 1; i > 0; i--) {
      for (let j = 0; j < this.width(); j++) {
          if (this.blockAt(i,j) !== ".") {
            return ret;
          }
        }
        ret++;
    }
    return ret;
  }

  nrOfEmptyRowsLeft() {
    let ret = 0;
    for (let col = 0; col < this.width(); col++) {
      for (let row = 0; row < this.height(); row++) {
        if (this.blockAt(row, col) !== ".") {
          return ret;
        }
      }
      ret++;
    }
    return ret;
  }

  nrOfEmptyRowsRight() {
    let ret = 0;
    for (let col = this.width() - 1; col > 0; col--) {
      for (let row = 0; row < this.height(); row++) {
        if (this.blockAt(row,col) !== ".") {
          return ret;
        }
      }
      ret++;
    }
    return ret;
  }
  
  width() {
    return this.orientations[this.orientation].originalMatrix[0].length;
  }
  height() {
    return this.orientations[this.orientation].originalMatrix.length
  }
}

