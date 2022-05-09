import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";





describe("Pseudorandom shufflebag:", () => {
let shuffleBag = new ShuffleBag();
const content = {};
    beforeEach(() => {
        content['T'] = 0;
        content['I'] = 0;
        content['L'] = 0;
        content['J'] = 0;
        content['Z'] = 0;
        content['S'] = 0;
        content['O'] = 0;
        
    });

    it("Calling spawn random returns a tetromino", () => {
        let newTetromino = shuffleBag.next();
        content[newTetromino.color] += 1;
        let found = 0;
        for(let item in content) {
            if (content[item] > 0) {
                found++;
            }
        }
        expect(found).to.equal(1)
    })
    it("Calling spawn random seven times returns one of each", () => {
        for(let i = 0; i < 7; i++) {
            let newTetromino = shuffleBag.next();
            content[newTetromino.color] += 1;
        }
        let found = 0;
        for(let item in content) {
            if (content[item] === 1) {
                found++;
            }
        }
        expect(found).to.equal(7)
    
    });
    it("Calling spawn random 70 times returns ten of each", () => {
        for(let i = 0; i < 70; i++) {
            let newTetromino = shuffleBag.next();
            content[newTetromino.color] += 1;
        }
        let found = 0;
        console.log('content', content)
        for(let item in content) {
            if (content[item] === 10) {
                found++;
            }
        }
        expect(found).to.equal(7)

    })
});