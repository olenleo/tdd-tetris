import { shapeToString } from "./shapes.mjs";
import {Tetromino} from "./Tetromino.mjs";


export class NewRotatingShape {
  
  color;
  orientation;
  orientations;
  originalMatrix;
  contentAsString;
  width;

  constructor(color, orientation) {
    this.color = color;
    this.generateOrientations(color);
    if (orientation === undefined) {
      this.orientation = 0;
    } else {
      this.orientation = orientation
    }
    this.trimString(this.orientations[this.orientation])
    
    this.width = Math.sqrt(this.contentAsString.length);
    this.originalMatrix = this.initializeMatrix();

    }
    trimString(string) {
      this.contentAsString = string.split(" ").join("") + "\n"
      let helperArr = string.split("\n");
      this.contentAsString = "";
      for (let i = 0; i < helperArr.length; i++) {
          this.contentAsString += helperArr[i].trim();
      }
    }

    initializeMatrix() {
        let contentIndex = 0;   
        let matrix = [];
        let row = [];
        for (let i = 0; i < this.width; i++) {
            for (let j= 0; j < this.width; j++) {
                row.push(this.contentAsString[contentIndex]);
                contentIndex++;
            }
            matrix[i] = row;
            row = [];
        }
        return matrix;
    }
  toString() {
    return this.orientations[this.orientation].toString()
  }

  getWidth() {
    return this.width;
  }

  rotateRight() {
    let setOrientation = (this.orientation === 0 ? this.orientations.length - 1 : this.orientation - 1)
    return new NewRotatingShape(this.color, setOrientation)
  }

  rotateLeft() {
    let setOrientation = (this.orientation === this.orientations.length - 1 ? 0 : this.orientation + 1)
    return new NewRotatingShape(this.color, setOrientation)
  }

  generateOrientations( shape ) {
    switch (shape) {
      case("T") : 
        this.orientations = [
         `TTT.
         .T..
         ....
         ....`,

         `.T..
          TT..
          .T..
          ....`,
         `....
          .T..
          TTT.
          ....`
          ,
         `.T..
          .TT.
          .T..
          ....`
        ];
      
      break;
      case("I") : 
        this.orientations = [
         `....
        IIII
        ....
        ....`,
         `.I..
          .I..
          .I..
          .I..`
        ]
      break;
      case("O") : 
        this.orientations = [
          `....
           .OO.
           .OO.
           ....`
        ]
        break;
      case("L") : 
        this.orientations = [
        `....
          LLL.
          L...
          ....`,
        `LL..
          .L..
          .L..
          ....`,
        `....
          ..L.
          LLL.
          ....`,
        `.L..
          .L..
          .LL.
          ....`
        ]
        break;
      case("J") : 
        this.orientations = [
        `....
          JJJ.
          ..J.
          ....`,
        `.J..
          .J..
          JJ..
          ....`,
        `....
          J...
          JJJ.
          ....`,
        `....
          JJJ.
          ..J.
          ....`
        ]
        break;
      default : 
      this.orientations = [`X`]
      break;
    }
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
    return this.originalMatrix[row][col]
  }

  cellAtIndex(row, column) {
    return this.orientations[this.orientation].originalMatrix[row][column]
  }

  width() {
    return this.width;
  }
  height() {
    return this.originalMatrix.length
  }
  toString() {
    return shapeToString(this)
  }
}