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
      board.drop(new NewRotatingShape("T").rotateLeft());
   
    });
  
    it("Tetromino cannot be moved left beyond the board", () => {
        for (let i = 0; i < 10; i++) {
            board.moveLeft();   
        }
       
      
      expect(board.toString()).to.equalShape(
            `.T........
             TT........
             .T........
             ..........
             ..........
             ..........`
        );
    });
});

describe("Falling tetrominoes respect immobile blocks", () => {
    let board;
    let immobileArray = [
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".",".",".",".",".",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        [".",".",".","X",".",".","X",".",".","."],
        
      ]
    beforeEach(() => {
        board = new Board(10, 6);
        board.setImmobileState(immobileArray)
        board.drop(new NewRotatingShape("O"));
        board.tick()
        board.tick()
    });
    
    it("Tetromino cannot pass an immobile block on left hand side", () => {
        
    
    board.moveLeft();
    expect(board.toString()).to.equalShape(
        `..........
        ..........
        ...X..X...
        ...XOOX...
        ...XOOX...
        ...X..X...`
    );
    });
  
    it("Tetromino cannot pass an immobile block on right hand side", () => {

        board.moveRight()
      
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ...X..X...
            ...XOOX...
            ...XOOX...
            ...X..X...`
        );
    });
  
    it("Tetromino cannot move down through an immobile block", () => {
        for (let i = 0; i < 10; i++) {
            board.moveDown();
        }
        board.drop(new NewRotatingShape("O"))
        for (let i = 0; i < 10; i++) {
            board.moveDown();
        }
        expect(board.toString()).to.equalShape(
            `..........
            ..........
            ...XOOX...
            ...XOOX...
            ...XOOX...
            ...XOOX...`
        );
    });
});
  