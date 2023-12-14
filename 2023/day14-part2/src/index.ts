import {simpleInput} from './input'
import input from './input';

const cache= new Map<string, string[][]>();

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

function tilt(table: string[][], direction) {
  const key = JSON.stringify({ table, direction})
  if(cache.has(key)){
    table = cache.get(key);
    return table;
  }
  if (direction === 'N' || direction === 'S') {
    table = transpose(data);
  }

  const sortWest = (a: string, b: string) => b.localeCompare(a);
  const sortEast = (a: string, b: string) => a.localeCompare(b);

  table.forEach((row, i) => {
    const supports = row.join('').split('#')
    const d = supports.map(support => {
      const sorted = support.split('')
        .sort(['W', 'N'].includes(direction) ? sortWest: sortEast)
        .join('')
      return sorted;
    }).join('#').split('')

    table[i] = d;
  })

  if (direction === 'N' || direction === 'S') {
    table = transpose(table);
  }

  cache.set(key, table);
  return table;
}

function calc(table: string[][]){
  table = transpose(table)
  let sum = 0;
  table.forEach((row, i) => {
    row.forEach((c, j) => {
      sum += c === 'O' ? (row.length-j): 0
    })
  })
  return sum
}

function visualize(table: string[][]){
  console.log(table.map(r => r.join('')).join('\n'))
}

let data = input.trim()
  .split('\n')
  .map(r => r.split(''));

// I heard you like arrays?
const history = [];
const pattern: { start: number, end: number, data: string[][]} = {
  start: 0,
  end: 0,
  data: [],
}

for(let i = 0; i < 1000000000; i++){
  const key = JSON.stringify(data);
  // Check if the table has appeared before
  let patternIndex = history.indexOf(key);
  if (patternIndex != -1) {
    // It has appeared, check if it has appeared twice
    if(history.lastIndexOf(key) !== patternIndex){
      // It has appeared twice, let's
      // 1. Save the start
      // 2. Save the end
      // 3. Save the state of the loop
      // and break the loop
      pattern.start = patternIndex;
      pattern.end = history.lastIndexOf(key)
      pattern.data = data;
      break;
    }
  }
  history.push(key);
  for (const direction of ['N', 'W', 'S', 'E']){
    data = tilt(data, direction)
  }
}

// Length of the pattern
const patternSize = pattern.end-pattern.start;

// 1000000000 % pattern size is the point of the loop where
// the pattern would end _at_ or just after 1000000000
// if the pattern had started at index 0
// Since we know the pattern iterates on ${patternSize} steps
// we can easily go "back in time" by reducing 1000000000
// by ${patternSize} and then doing % on the result
// This would give us the "remaining steps".
const remainingSteps = (1000000000 - pattern.start) % patternSize;

// Since we know the number of remaining steps, let's loop
// the remaining steps and get the result
for(let i = 0; i < remainingSteps; i++){
  for (const direction of ['N', 'W', 'S', 'E']){
    data = tilt(data, direction)
  }
}

console.log(calc(data))