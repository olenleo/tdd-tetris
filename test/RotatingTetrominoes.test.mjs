
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
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


describe("The I shape", () => {
  const shape = Tetromino.I_SHAPE;
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.....
       .....
       IIII.
       .....
       .....`
    );
  });
  it("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });
  it("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `..I..
       ..I..
       ..I..
       ..I..
       .....`
    );
  });
  it("has 2 distinct orientations", () => {
    expect(distinctOrientations(shape).size).to.equal(2);
  });
});



describe("The O shape", () => {
  const shape = Tetromino.O_SHAPE;
  it("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });
  it("cannot be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `.OO
       .OO
       ...`
    );
  });
  it("cannot be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.OO
       .OO
       ...`
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
      board.drop(Tetromino.T_SHAPE);
      for (let i = 0; i < 10; i++) {
        board.moveDown()
      }
      board.drop(Tetromino.T_SHAPE)
    });
  
  
  it("can be rotated left / counterclockwise", () => {
    board.rotateLeft()
    console.log('Board print')
      console.log(board.toString())
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ....T.....
       ...TTT....`
    );
  });

  
  it("can be rotated right / clockwise", () => {
    board.rotateRight()
    console.log('Board print')
    console.log(board.toString())
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ....T.....
       ...TTT....`
    );

  });
  

  

});
describe("Falling tetrominoes and rotation:", () => {
  let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.I_SHAPE.rotateRight());
      board.moveLeft();
      for (let i = 0; i < 10; i++) {
        board.moveDown()
      }
      board.drop(Tetromino.I_SHAPE.rotateRight());
      board.moveRight();
      for (let i = 0; i < 10; i++) {
        board.moveDown()
      }
      board.drop(Tetromino.I_SHAPE)
      console.log('PRINT BOARD')
      console.log()
    });
  
  
  it("a falling tetromino won't rotate if there is no room", () => {
    board.rotateLeft();
    board.moveDown();
    board.rotateLeft();
    board.rotateRight();
   expect(board.toString()).to.equalShape(
      `..........
       ....I.....      
       ...III....
       ...III....
       ...III....
       ...I.I....`
    ); 
  });

  
});
describe("Falling I-tetrominoes and rotation:", () => {
  let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.I_SHAPE.rotateRight());
    });
    it("a falling tetromino performs a wall kick when it's rotated cw too close to the left wall", () => {
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.moveLeft();
      board.rotateLeft();
      expect(board.toString()).to.equalShape(
          `..........
          ..........
          IIII......      
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
          ..........      
          ......IIII
          ..........
          ..........
          ..........`
        );

    });
  }
)
describe("Falling L-tetrominoes and rotation:", () => {
let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.L_SHAPE.rotateLeft());
  });
  it("a falling tetromino performs a wall kick when it's rotated cw too close to the left wall", () => {
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    console.log(board.toString())
    board.rotateLeft()
    expect(board.toString()).to.equalShape(
        `..........
         LLL.......
         L.........      
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
        .......LLL      
        .......L..
        ..........
        ..........
        ..........`
      );
    });
  }
)