
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { NewRotatingShape } from "../src/NewRotatingShape.mjs";
import { Board} from "../src/Board.mjs"

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  const shape = Tetromino.T_SHAPE;
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.T.
       TTT
       ...`
    );
  });
  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T.
       .TT
       .T.`
    );
  });
  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T.
       TT.
       .T.`
    );
  });
  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});


describe("The new T shape", () => {
  const shape = new NewRotatingShape("T");
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `TTT.
       .T..
       ....
       ....`
    );
  });
  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });
  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....
       `
    );
  });
  it("has 4 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(4);
  });
});


describe("The I shape", () => {
  const shape = new NewRotatingShape("I");
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       IIII
       ....
       ....
       `
    );
  });
  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.
       `
    );
  });
  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I.
       ..I.
       ..I.
       ..I.
       `
    );
  });
  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape", () => {
  const shape = new NewRotatingShape("O");
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });
  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });
  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });
  it("has 1 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(1);
  });
});

describe("Rotating falling tetrominoes", () => {
  let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(new NewRotatingShape("T"));
      for (let i = 0; i < 10; i++) {
        board.moveDown()
      }
      board.drop(new NewRotatingShape("T"));
    });
  
  
  it("can be rotated left / counterclockwise", () => {
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ...TTT....
       ....T.....`
    );
  });

  
  it("can be rotated right / clockwise", () => {
    board.rotateRight()
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ...TTT....
       ....T.....`
    );

  });
  

  

});
describe("Falling tetrominoes and rotation:", () => {
  let board;
  
    beforeEach(() => {
      board = new Board(10, 6);
      
      let immobileArray = [
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        
      ]
      board.setImmobileState(immobileArray)
      
    });
  
  
  it("a falling tetromino won't rotate if there is no room", () => {
    board.drop(new NewRotatingShape("I").rotateRight());
    board.moveDown();
    board.moveDown();
    board.rotateLeft();
   expect(board.toString()).to.equalShape(
      `..........
       ..........      
       ...X.IX...
       ...X.IX...
       ...X.IX...
       ...X.IX...`
    ); 
  });

  
});
describe("Falling I-tetrominoes and rotation:", () => {
  let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(new NewRotatingShape("I").rotateLeft());
    });
    it("a falling tetromino performs a wall kick when it's rotated cw too close to the left wall", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
          `..........
          IIII......      
          ..........
          ..........
          ..........
          ..........`
        );

    });
    it("a falling tetromino performs a wall kick when it's rotated ccw too close to the right wall", () => {
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.moveRight();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
         `..........
         ......IIII
          ..........      
          ..........
          ..........
          ..........`
        );

    });
  }
)
/*
  Test L-tetrominoes to test different wall kick adjustment
*/
describe("Falling L-tetrominoes and rotation:", () => {
let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(new NewRotatingShape("L").rotateLeft());
  });
  it("a falling tetromino performs a wall kick when it's rotated cw too close to the left wall", () => {
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
        `..........
         ..L.......
         LLL.......
         ..........
         ..........
         ..........`
      );

  });
  it("a falling tetromino performs a wall kick when it's rotated ccw too close to the right wall", () => {
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
       `..........
        .........L      
        .......LLL
        ..........
        ..........
        ..........`
      );
    });
  }
)