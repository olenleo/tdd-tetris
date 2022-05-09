import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewRotatingShape } from "../src/NewRotatingShape.mjs";



describe("Clearing rows", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    let immobileArray = [
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      ["X","X","X","X",".",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray);
    board.drop(new NewRotatingShape("O"))
    for (let i = 0; i < 10; i++) {
      board.tick()
    }
  });

  it("A single row can be cleared", () => {
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....OO....`
    );
  });
  it("Several rows can be cleared", () => {
    let immobileArray = [
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      ["X","X","X","X",".",".","X","X","X","X"],
      ["X","X","X","X",".","X","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray)
    board.drop(new NewRotatingShape("T").rotateRight())
    for (let i = 0; i < 10; i++) {
      board.tick()
    }
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      ..........
      ....T.....`
    );
  })
  it("Clearing rows respects holes above and below",() => {
    let immobileArray = [
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      ["X","X","X","X","X",".","X","X","X","X"],
      ["X","X",".","X","X",".","X","X","X","X"],
      ["X","X","X","X","X",".","X","X","X","X"],
      ["X","X","X","X",".",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray)
    board.drop(new NewRotatingShape("I").rotateRight())
    for (let i = 0; i < 10; i++) {
      board.tick()
    }
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ..........
      XX.XXIXXXX
      XXXX.IXXXX`
    );
  });
});