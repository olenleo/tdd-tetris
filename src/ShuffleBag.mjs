import { Board } from "./Board.mjs";
import { NewRotatingShape } from "./NewRotatingShape.mjs";
export class ShuffleBag {

    #content;
    #currentItem;
    #currentPosition = -1; 

    constructor() {
        this.#content = [];
        this.#content.push(new NewRotatingShape("T"));
        this.#content.push(new NewRotatingShape("I"));
        this.#content.push(new NewRotatingShape("L"));
        this.#content.push(new NewRotatingShape("J"));
        this.#content.push(new NewRotatingShape("O"));
        this.#content.push(new NewRotatingShape("S"));
        this.#content.push(new NewRotatingShape("Z"));
    }

    next() {
        if (this.#currentPosition < 1)
        { 
            this.#currentPosition = 6
            this.#currentItem = this.#content[0];
            return this.#currentItem;
        }
        var pos = Math.floor(Math.random() * this.#currentPosition);
        this.#currentItem = this.#content[pos];
        this.#content[pos] = this.#content[this.#currentPosition];
        this.#content[this.#currentPosition] = this.#currentItem;
        this.#currentPosition--;
        return this.#currentItem;
    }

}