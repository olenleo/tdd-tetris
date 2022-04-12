export class RotatingShape {
    width;
    contentAsString;
    originalMatrix;
    
    constructor(content) {
        this.contentAsString = content.split(" ").join("") + "\n"
        let helperArr = content.split("\n");
        this.contentAsString = "";
        for (let i = 0; i < helperArr.length; i++) {
            this.contentAsString += helperArr[i].trim();
        }
        this.width = Math.sqrt(this.contentAsString.length);
        this.originalMatrix = this.initializeMatrix(this.contentAsString);
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
    
    rotateRight() {
        let newMatrix = this.originalMatrix[0].map((val, index) => this.originalMatrix.map(row => row[index]).reverse())
        let s = ""
        for (let row = 0; row < newMatrix.length; row++) {
            for (let i = 0; i < newMatrix.length; i++ ) {
                s += newMatrix[row][i];
            }
              s += "\n";
        }
        return new RotatingShape(s)
    }
   
    rotateLeft() {
        let newMatrix = this.originalMatrix[0].map((val, index) => this.originalMatrix.map(row => row[row.length-1-index]));
        let s = ""
        for (let row = 0; row < newMatrix.length; row++) {
            for (let i = 0; i < newMatrix.length; i++ ) {
              s += newMatrix[row][i]
            }
            s += "\n"
        }
        return new RotatingShape(s)
    }
    
    toString() {
        let s = ""
        for (let row = 0; row < this.originalMatrix.length; row++) {
            for (let i = 0; i < this.originalMatrix.length; i++ ) {
              s += this.originalMatrix[row][i]
            }
            s += "\n"
        }
        return s
       }
    getMatrix() {
        return this.originalMatrix
    }
}
  