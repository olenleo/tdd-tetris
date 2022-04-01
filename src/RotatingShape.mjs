
export class RotatingShape {
    width;
    contentAsString;
    contentMatrix;

    constructor(content) {
        this.width = 3
        this.contentAsString = content.split(" ").join("") + "\n"
        let helperArr = content.split("\n", 3);
        for (let i = 0; i < helperArr.length; i++) {
            helperArr[i] = helperArr[i].trim()
        }
        
        this.contentMatrix = 
            [
                [[],[],[]],
                [[],[],[]],
                [[],[],[]]
            ]
   
        for (let row = 0; row < helperArr.length; row++) {
            for (let i = 0; i < helperArr.length; i++ ) {
                this.contentMatrix[row][i] = helperArr[row].charAt(i)
            }
        }

        for (let i = 0; i < 4; i++) {
            this.rotateRight()
            console.log(this.toString())
        }
    }
    /**
     * Credit: https://reginafurness.medium.com/rotate-a-square-matrix-by-90-degrees-in-javascript-700f0315e5c
     * 
     */
    rotateRight() {
        let left = 0, right = this.contentMatrix.length - 1;
        while (left < right) {
            for (let i = 0; i < right - left; i++) {
                let top = left, bottom = right;
    
                // save top left
                let topLeft = this.contentMatrix[top][left + i];
                
                // swap top left and bottom left
                this.contentMatrix[top][left + i] = this.contentMatrix[bottom - i][left];
    
                // swap bottom left and bottom right
                this.contentMatrix[bottom - i][left] = this.contentMatrix[bottom][right - i];
                
                // swap bottom right and top right
                this.contentMatrix[bottom][right - i] = this.contentMatrix[top + i][right];
    
                // swap top right and top left
                this.contentMatrix[top + i][right] = topLeft;
    
            }
            left++;
            right--;
        }
    }

    
    toString() {
        let s = ""
        for (let row = 0; row < this.contentMatrix.length; row++) {
            for (let i = 0; i < this.contentMatrix.length; i++ ) {
              s += this.contentMatrix[row][i]
            }
            s += "\n"
        }
       return s;
    }
}
  