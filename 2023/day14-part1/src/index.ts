import {simpleInput} from './input'
import input from './input';

const cache= new Map<string, string[][]>();

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

let cacheCount = 0;

function tilt(table: string[][], direction) {
  const key = JSON.stringify({ table, direction})
  if(cache.has(key)){
    cacheCount++;
    table = cache.get(key);
    return table;
  }
  if (direction === 'N') {
    table = transpose(data);
  } else if (direction === 'S'){
    table = transpose(table);
  }

  const sortWest = (a: string, b: string) => b.localeCompare(a);
  const sortEast = (a: string, b: string) => a.localeCompare(b);

  table.forEach((row, i) => {
    const supports = row.join('').split('#')
    const d = supports.map(support => {
      const sorted = support.split('')
        .sort((a, b) => {
          return ['W', 'N'].includes(direction) ? sortWest(a, b): sortEast(a, b)
        }).join('')
      return sorted;
    }).join('#').split('')

    table[i] = d;
  })

  if (direction === 'N') {
    table = transpose(table);
  } else if (direction === 'S'){
    table = transpose(table);
  }
  cacheCount = 0;
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

let data = simpleInput.trim()
  .split('\n')
  .map(r => r.split(''));

for(let i = 0; i < 1000000000; i++){
  if(i % 1000000 === 0) console.log(`${(i/1000000000)*100}%`)
  for (const direction of ['N', 'W', 'S', 'E']){
    data = tilt(data, direction)
  }
}

