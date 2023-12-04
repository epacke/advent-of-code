"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const lines = input_1.default.split(/\n/g);
let sum = 0;
let prevLine = '';
lines.forEach((line, i) => {
    //console.log(`================== LINE ${i+1}`)
    let numStr = '';
    let adjacentSpecialCharacter = false;
    let position = -1;
    let prevLine = lines[i - 1] || '';
    let nextLine = lines[i + 1] || '';
    for (const c of line) {
        position += 1;
        // Test behind and ahead
        if (/[0-9]/.test(c)) {
            numStr += c;
            // check prevLine matches
            adjacentSpecialCharacter = adjacentSpecialCharacter ||
                /[^0-9\.]/.test(prevLine[position - 1] || '.') ||
                /[^0-9\.]/.test(prevLine[position] || '.') ||
                /[^0-9\.]/.test(prevLine[position + 1] || '.') ||
                /[^0-9\.]/.test(nextLine[position - 1] || '.') ||
                /[^0-9\.]/.test(nextLine[position] || '.') ||
                /[^0-9\.]/.test(nextLine[position + 1] || '.') ||
                /[^0-9\.]/.test(line[position - 1] || '.') ||
                /[^0-9\.]/.test(line[position + 1] || '.');
            //console.log(adjacentSpecialCharacter);
        }
        if (!/[0-9]/.test(c) || position === line.length - 1) {
            if (numStr != '' && adjacentSpecialCharacter) {
                console.log(numStr);
                sum += parseInt(numStr);
            }
            numStr = '';
            adjacentSpecialCharacter = false;
        }
    }
});
const t = `
......*...........................*.................$745.......739.....*...399...30............&..@...........924.117..........309..........
...883....544.....33.........585=.428.146................288.....*..853....*...........*891.409....429..460...*..........997....*........187
.............*818........829..........*....846..............................248.....574..................*....789.......*.....965....-..*...`;
// old answer:
// 525479
// 527364
console.log(sum);
//# sourceMappingURL=index.js.map