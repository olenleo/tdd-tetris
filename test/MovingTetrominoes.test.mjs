import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


describe("Falling tetrominoes can move", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("Tetromino can move to the left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.tick();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Tetromino can move to the right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.tick();
    expect(board.toString()).to.equalShape(
       `.....T....
        ....TTT...
        ..........
        ..........
        ..........
        ..........`
    );
  });

  xit("stop when they land on another block", () => {
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
});
