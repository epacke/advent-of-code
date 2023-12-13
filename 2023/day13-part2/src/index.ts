import input from './input';

const fixSmudge = (table: string[][]) => {
  for(let i = 1; i < table.length; i++){
    let firstPart = table.slice(0, i).reverse();
    let secondPart = table.slice(i)

    firstPart.splice(secondPart.length);
    secondPart.splice(firstPart.length);

    let changes: number = 0;
    firstPart.forEach((r, j) => {
      r.forEach((c, k) => {
        changes += firstPart[j][k] === secondPart[j][k] ? 0: 1;
      })
    })
    if(changes === 1){
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
  sum += fixSmudge(table)*100 + fixSmudge(transpose(table));

})

//31954
console.log(sum)