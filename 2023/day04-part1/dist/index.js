"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const input_1 = __importDefault(require("./input"));
class Card {
    constructor(rawCard) {
        const [cardIdStr, cardData] = rawCard.split(': ');
        this.cardId = parseInt(cardIdStr.replace(/[^0-9]/g, ''));
        const [cardNumberStr, cardWinnersStr] = cardData.split(/ +\| +/);
        this.cardNumbers = cardNumberStr.split(/ +/g).map(n => parseInt(n));
        this.cardWinners = cardWinnersStr.split(/ +/g).map(n => parseInt(n));
    }
    get winningNumbers() {
        return this.cardNumbers.filter(n => this.cardWinners.includes(n));
    }
    get points() {
        return this.winningNumbers.length === 0 ? 0 : Math.pow(2, this.winningNumbers.length - 1);
    }
}
exports.Card = Card;
const lines = input_1.default.split(/\n/g);
let sum = 0;
lines.forEach(line => {
    const card = new Card(line);
    sum += card.points;
});
const t = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
console.log(sum);
//# sourceMappingURL=index.js.map