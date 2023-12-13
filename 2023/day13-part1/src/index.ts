import input from './input';


const findMirror = (table: string[][])=> {
  for(let i = 1; i < table.length; i++){
    let firstPart = table.slice(0, i).reverse();
    let secondPart = table.slice(i)

    firstPart.splice(secondPart.length);
    secondPart.splice(firstPart.length);

    if(JSON.stringify(firstPart) === JSON.stringify(secondPart)){
      return i
    }
  }
  return 0
}

function transpose(matrix) {
  return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

let sum = 0;
input.trim().split('\n\n').forEach(puzzle => {
  const table: string[][] = puzzle.split('\n').map(r => r.split('').map(r => r))
  sum += findMirror(table)*100 + findMirror(transpose(table));
})

console.log(sum)