"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchNumber = void 0;
const input_1 = __importDefault(require("./input"));
const lines = input_1.default.split(/\n/g);
let sum = 0;
let validNumbers = [];
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (!/[0-9.]/.test(char)) {
            findAdjacentNumbers(lines, y, x);
        }
    });
});
function fetchNumber(lines, lineNumber, startingPosition) {
    let line = lines[lineNumber];
    let numStr = [];
    let position = startingPosition;
    while (/[0-9]/.test(line[position])) {
        numStr.push(line[position]);
        position += 1;
    }
    position = startingPosition - 1;
    while (/[0-9]/.test(line[position])) {
        numStr = [line[position], ...numStr];
        position -= 1;
    }
    return { x: position + 1, y: lineNumber, number: parseInt(numStr.join('')) };
}
exports.fetchNumber = fetchNumber;
function isNumber(c) {
    return /[0-9]/.test(c);
}
function findAdjacentNumbers(lines, lineNumber, position) {
    const foundNumbers = [];
    const currentLine = lines[lineNumber];
    const previousLine = lines[lineNumber - 1] || '';
    const nextLine = lines[lineNumber + 1] || '';
    const currentChar = currentLine[position];
    const topLeft = previousLine[position - 1] || '.';
    const top = previousLine[position] || '.';
    const topRight = previousLine[position + 1] || '.';
    const left = currentLine[position - 1] || '.';
    const right = currentLine[position + 1] || '.';
    const bottomLeft = nextLine[position - 1] || '.';
    const bottom = nextLine[position] || '.';
    const bottomRight = nextLine[position + 1] || '.';
    if (isNumber(top)) {
        foundNumbers.push(fetchNumber(lines, lineNumber - 1, position));
    }
    // If top is a number and there's a number diagonally they're the same number
    if (!isNumber(top) && isNumber(topLeft)) {
        foundNumbers.push(fetchNumber(lines, lineNumber - 1, position - 1));
    }
    // If top is a number and there's a number diagonally they're the same number
    if (!isNumber(top) && isNumber(topRight)) {
        foundNumbers.push(fetchNumber(lines, lineNumber - 1, position + 1));
    }
    if (isNumber(left)) {
        foundNumbers.push(fetchNumber(lines, lineNumber, position - 1));
    }
    if (isNumber(right)) {
        foundNumbers.push(fetchNumber(lines, lineNumber, position + 1));
    }
    if (isNumber(bottom)) {
        foundNumbers.push(fetchNumber(lines, lineNumber + 1, position));
    }
    // If bottom is a number and there's a number diagonally they're the same number
    if (!isNumber(bottom) && isNumber(bottomLeft)) {
        foundNumbers.push(fetchNumber(lines, lineNumber + 1, position - 1));
    }
    // If bottom is a number and there's a number diagonally they're the same number
    if (!isNumber(bottom) && isNumber(bottomRight)) {
        foundNumbers.push(fetchNumber(lines, lineNumber + 1, position + 1));
    }
    if (currentChar === '*' && foundNumbers.length === 2) {
        sum += foundNumbers.map(n => n.number).reduce((a, b) => a * b);
        foundNumbers
            .filter(n => {
            return !validNumbers
                .some(vn => { return n.x === vn.x && n.y === vn.y; });
        })
            .forEach(n => {
            validNumbers.push(n);
        });
    }
}
// 79026871
console.log(sum);
//# sourceMappingURL=index.js.map