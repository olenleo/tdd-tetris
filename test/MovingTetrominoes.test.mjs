import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { NewRotatingShape } from "../src/NewRotatingShape.mjs";
import { Tetromino } from "../src/Tetromino.mjs";


describe("Falling tetrominoes can move", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(new NewRotatingShape("T"));
  });

  it("Tetromino can move to the left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  it("Tetromino can move to the right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
       `....TTT...
        .....T....
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
       ...TTT....
       ....T.....
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
      board.drop(new NewRotatingShape("I").rotateLeft());
   
    });
  
    it("Tetromino cannot be moved left beyond the board", () => {
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
             .....I....
             .....I....
             .....I....
             .....I....`
        );
    });
});

describe("Falling tetrominoes respect board boundaries pt 2", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      board.drop(Tetromino.T_SHAPE.rotateRight());
   
    });
  
    it("Tetromino cannot be moved left beyond the board", () => {
        for (let i = 0; i < 10; i++) {
            board.moveLeft();   
        }
       
      
      expect(board.toString()).to.equalShape(
            `T.........
             TT........
             T.........
             ..........
             ..........
             ..........`
        );
    });
});

describe("Falling tetrominoes respect immobile blocks", () => {
    let board;
    beforeEach(() => {
        board = new Board(10, 6);
        board.drop(Tetromino.T_SHAPE.rotateRight());
        board.tick()
        board.tick()
        board.tick()
        board.tick()
        board.drop(Tetromino.O_SHAPE);

    });
    
    it("Tetromino cannot pass an immobile block on left hand side", () => {
        
        board.moveRight();
        board.moveRight();
        board.moveDown();
        board.moveDown();
        board.moveDown();
        board.moveDown();
      
      expect(board.toString()).to.equalShape(
           `..........
            ..........
            ..........
            ....T.....
            ....TTOO..
            ....T.OO..`
        );
    });
  
    it("Tetromino cannot pass an immobile block on right hand side", () => {
        board.moveLeft();
        board.moveLeft();
        board.moveDown();
        board.moveDown();
        board.moveDown();
        board.moveDown();
        board.moveRight()
      
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ..........
            ....T.....
            ..OOTT....
            ..OOT.....`
        );
    });
  
    it("Tetromino cannot move down through an immobile block", () => {
        for (let i = 0; i < 10; i++) {
            board.moveDown();
        }
        expect(board.toString()).to.equalShape(
            `..........
            ....OO....
            ....OO....
            ....T.....
            ....TT....
            ....T.....`
        );
    });
});
  