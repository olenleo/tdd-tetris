import { Board } from "./Board.mjs";

export class Scoring {
    #score;

    constructor() {
        this.#score = 0;
    }

    getScore() {
        return this.#score
    }

    addPoints( rows ) {
        switch (rows) {
            case(1) : 
                this.#score += 1;
                break;
            case(2) :  
                this.#score += 3;
                break;
            case(3) : 
                this.#score += 5;
                break;
            case(4) : 
                this.#score += 8;
                break;
            default :
                break;
        }   
    }
}
