import input from './input';

const lines = input.split(/\n/g);

let sum = 0;
lines.forEach((line, i) => {

  let numStr: string = ''
  let adjacentSpecialCharacter: boolean = false
  let position = -1;
  let prevLine = lines[i-1] || '';
  let nextLine = lines[i+1] || '';

  for (const c of line){
    position += 1;
    // Test behind and ahead
    if(/[0-9]/.test(c)){
      numStr += c;
      // check prevLine matches
      adjacentSpecialCharacter = adjacentSpecialCharacter ||
        /[^0-9\.]/.test(prevLine[position-1] || '.') ||
        /[^0-9\.]/.test(prevLine[position] || '.') ||
        /[^0-9\.]/.test(prevLine[position + 1] || '.') ||
        /[^0-9\.]/.test(nextLine[position-1] || '.') ||
        /[^0-9\.]/.test(nextLine[position] || '.') ||
        /[^0-9\.]/.test(nextLine[position + 1] || '.') ||
        /[^0-9\.]/.test(line[position-1] || '.') ||
        /[^0-9\.]/.test(line[position+1] || '.');
    }

    if(!/[0-9]/.test(c) || position === line.length - 1){
      if(numStr != '' && adjacentSpecialCharacter){
        sum += parseInt(numStr);
      }
      numStr = '';
      adjacentSpecialCharacter = false;
    }
  }
})

console.log(sum);