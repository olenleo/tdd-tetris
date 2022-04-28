import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


describe("Falling tetrominoes can move", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  it("Tetromino can move to the left", () => {
    board.moveLeft();
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
    board.moveRight();
    expect(board.toString()).to.equalShape(
       `.....T....
        ....TTT...
        ..........
        ..........
        ..........
        ..........`
    );
  });

 it("Tetromino can be moved down", () => {
    board.moveDown()
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });
});


describe("Falling tetrominoes respect board boundaries", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.I_SHAPE.rotateRight());
   
    });
  
    it("Tetromino cannot be moved left beyond the board", () => {
        console.log(board.toString())
        for (let i = 0; i < 10; i++) {
            board.moveLeft();   
        }
       
      
      expect(board.toString()).to.equalShape(
            `I.........
             I.........
             I.........
             I.........
             ..........
             ..........`
        );
    });
  
    it("Tetromino cannot be moved right beyond the board", () => {
        for (let i = 0; i < 10; i++) {
            board.moveRight();
        }
      
        expect(board.toString()).to.equalShape(
            `.........I
             .........I
             .........I
             .........I
             ..........
             ..........`
        );
    });
  
    it("Tetromino cannot be dropped beyond the board", () => {
        for (let i = 0; i < 10; i++) {
            board.moveDown();
        }
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ....I.....
             ....I.....
             ....I.....
             ....I.....`
        );
    });
});
describe("Falling tetrominoes respect immobile blocks", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
        board.drop(Tetromino.I_SHAPE.rotateRight());
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.O_SHAPE);
        console.log('Board print')
        console.log(board.toString())
    });
  
    it("Tetromino cannot pass an immobile block on left hand side", () => {
        board.moveRight();

        for (let i = 0; i < 10; i++) {
            board.moveDown()
            board.moveLeft()
            console.log('Board print')
        console.log(board.toString())
        }
      
      expect(board.toString()).to.equalShape(
           `..........
            ..........
            ....I.....
            ....I.....
            ....IOO...
            ....IOO...`
        );
    });
  
    xit("TTetromino cannot pass an immobile block on right hand side", () => {
        for (let i = 0; i < 10; i++) {
            board.moveRight();
        }
      
        expect(board.toString()).to.equalShape(
            `.........I
             .........I
             .........I
             .........I
             ..........
             ..........`
        );
    });
  
    xit("Tetromino cannot move down through an immobile block", () => {
        for (let i = 0; i < 10; i++) {
            board.moveDown();
        }
        expect(board.toString()).to.equalShape(
            `..........
             ..........
             ....I.....
             ....I.....
             ....I.....
             ....I.....`
        );
    });
});
  