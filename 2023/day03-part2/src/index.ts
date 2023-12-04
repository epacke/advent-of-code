import input from './input';
import { INumber } from './interfaces';

const lines = input.split(/\n/g);

let sum = 0;
let validNumbers: INumber[] = []

lines.forEach((line, y) => {
  line.split('').forEach((char, x) => {
    if(!/[0-9.]/.test(char)) {
      findAdjacentNumbers(lines, y, x);
    }
  })

})

export function fetchNumber (lines: string[], lineNumber: number, startingPosition: number) {
  let line = lines[lineNumber];
  let numStr: string[] = []
  let position = startingPosition

  while(/[0-9]/.test(line[position])){
    numStr.push(line[position]);
    position += 1;
  }

  position = startingPosition-1
  while(/[0-9]/.test(line[position])){
    numStr = [line[position], ...numStr]
    position -= 1
  }

  return { x: position + 1, y: lineNumber, number: parseInt(numStr.join('')) }
}

function isNumber(c){
  return /[0-9]/.test(c);
}

function findAdjacentNumbers(lines: string[], lineNumber: number, position: number) {

  const foundNumbers: { x: number, y: number, number: number }[] = []
  const currentLine = lines[lineNumber];
  const previousLine: string = lines[lineNumber-1] || '';
  const nextLine: string =  lines[lineNumber + 1] || '';

  const currentChar = currentLine[position];
  const topLeft = previousLine[position-1] || '.';
  const top = previousLine[position] || '.';
  const topRight = previousLine[position+1] || '.';
  const left = currentLine[position-1] || '.';
  const right = currentLine[position+1] || '.';
  const bottomLeft = nextLine[position-1] || '.';
  const bottom = nextLine[position] || '.';
  const bottomRight = nextLine[position+1] || '.';

  if(isNumber(top)) {
    foundNumbers.push(fetchNumber(lines, lineNumber-1, position))
  }

  // If top is a number and there's a number diagonally they're the same number
  if (!isNumber(top) && isNumber(topLeft)){
    foundNumbers.push(fetchNumber(lines, lineNumber-1, position-1))
  }

  // If top is a number and there's a number diagonally they're the same number
  if (!isNumber(top) && isNumber(topRight)){
    foundNumbers.push(fetchNumber(lines, lineNumber-1, position+1));
  }

  if(isNumber(left)){
    foundNumbers.push(fetchNumber(lines, lineNumber, position-1));
  }

  if(isNumber(right)){
    foundNumbers.push(fetchNumber(lines, lineNumber, position+1));
  }

  if(isNumber(bottom)) {
    foundNumbers.push(fetchNumber(lines, lineNumber+1, position));
  }

  // If bottom is a number and there's a number diagonally they're the same number
  if (!isNumber(bottom) && isNumber(bottomLeft)){
    foundNumbers.push(fetchNumber(lines, lineNumber+1, position-1));
  }

  // If bottom is a number and there's a number diagonally they're the same number
  if (!isNumber(bottom) && isNumber(bottomRight)){
    foundNumbers.push(fetchNumber(lines, lineNumber+1, position+1));
  }

  if (currentChar === '*' && foundNumbers.length === 2){
    sum += foundNumbers.map(n => n.number).reduce((a, b) => a * b )
    foundNumbers
      .filter(n => {
        return !validNumbers
          .some(vn => { return n.x === vn.x && n.y === vn.y })
      })
      .forEach(n => {
        validNumbers.push(n);
      })
  }
}

console.log(sum);
