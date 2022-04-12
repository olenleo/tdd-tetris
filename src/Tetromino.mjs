import {RotatingShape} from "./RotatingShape.mjs";
/**
 * For full disclosure, I have based this upon https://github.com/luontola/tdd-mooc-tetris/blob/d36b12f62d0d5839e47fd2e403e300f16f592eae/src/Tetrominoe.mjs
 * Toimin TIRA:ssa oppimallani tavalla, eli tutustuin koodiin ja toteutin sen uudestaan seuraavana päivänä ilman muistiinpanoja.
 * Toivottavasti tämä menettely kelpaa myös tällä kurssilla!
 */

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

  cellAtIndex(row, column) {
    console.log('Cell at [', row, ',', column, '] :',this.orientations[this.orientation].originalMatrix[row][column])
    return this.orientations[this.orientation].originalMatrix[row][column]
  }
  
}

