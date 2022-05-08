import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Scoring } from "../src/Scoring.mjs";
import { NewRotatingShape} from "../src/NewRotatingShape.mjs"





describe("Clearing rows and scoring", () => {
  let board;

  function spawnAndDropI() {
    board.drop(new NewRotatingShape("I").rotateLeft())
    for (let i = 0; i < 10; i++) {
      board.tick()
    }
}
  beforeEach(() => {
    board = new Board(10, 6);
  });

  it("Score starts at 0", () => {
      expect(board.getScore()).to.equal(0);
})
  it("Clearing a single row returns 1 point", () => {
    let immobileArray = [
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        ["X","X","X","X","X",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray);
    spawnAndDropI();
    expect(board.getScore()).to.equal(1);
  });
  it("Clearing two rows returns 3 points", () => {
    let immobileArray = [
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      ["X","X","X","X","X",".","X","X","X","X"],
      ["X","X","X","X","X",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray)
    board.drop(new NewRotatingShape("I").rotateLeft())
    for (let i = 0; i < 10; i++) {
      board.tick()
    }
    expect(board.getScore()).to.equal(3);
  })
  it("Clearing three rows returns 5 points", () => {
    let immobileArray = [
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      [".",".",".",".",".",".",".",".",".","."],
      ["X","X","X","X","X",".","X","X","X","X"],
      ["X","X","X","X","X",".","X","X","X","X"],
      ["X","X","X","X","X",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray)
    spawnAndDropI();
    expect(board.getScore()).to.equal(5);
  });
  it("Clearing a tetris rows returns 8 points", () => {
    let immobileArray = [
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        ["X","X","X","X","X",".","X","X","X","X"],
        ["X","X","X","X","X",".","X","X","X","X"],
        ["X","X","X","X","X",".","X","X","X","X"],
        ["X","X","X","X","X",".","X","X","X","X"],
    ]
    board.setImmobileState(immobileArray)
    spawnAndDropI();
    expect(board.getScore()).to.equal(8);
  });
});