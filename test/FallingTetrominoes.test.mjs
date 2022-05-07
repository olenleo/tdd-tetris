import { expect, util } from "chai";
import { Board } from "../src/Board.mjs";
import { NewRotatingShape } from "../src/NewRotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TTT....
       ..........
       ..........
       ..........
       ..........`
    );
  });


  it("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....T.....
       ...TTT....`
    );
  });
  // Had a falsely implemented Tetromino shape - this test was used for debugging 
  it("J-tetrominoes can be dropped", () => {
     board.drop(Tetromino.J_SHAPE);

    expect(board.toString()).to.equalShape(
      `..........
       ...JJJ....
       .....J....
       ..........
       ..........
       ..........`
    );
  })
});

describe("Falling new rotating shapes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });


  it("start from the top middle", () => {
    board.drop(new NewRotatingShape("T"));

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("stop when they hit the bottom", () => {
    board.drop(new NewRotatingShape("T"));
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  it("stop when they land on another block", () => {
    board.drop(new NewRotatingShape("T"));
    fallToBottom(board);
    board.drop(new NewRotatingShape("T"));
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });
  // Had a falsely implemented Tetromino shape - this test was used for debugging 
  it("J-tetrominoes can be dropped", () => {
     board.drop(new NewRotatingShape("J"));

    expect(board.toString()).to.equalShape(
      `..........
       ...JJJ....
       .....J....
       ..........
       ..........
       ..........`
    );
  })
});