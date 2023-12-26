import {input } from './input'

enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN
}

interface IHeatlossVector {
  heatLoss: number,
  x: number,
  y: number,
  direction: Direction;
  steps: number,
}

const j = (o: any) => JSON.stringify(o);

const grid = input.trim().split('\n').map(r => r.split('').map(n => parseInt(n)));
const visited = new Set<string>()


function sortQueue(a: IHeatlossVector, b: IHeatlossVector){
  return a.heatLoss - b.heatLoss;
}

const queue: IHeatlossVector[] = [
  { heatLoss: 0, x: 0, y: 0, direction: Direction.RIGHT, steps: 0 },
  { heatLoss: 0, x: 0, y: 0, direction: Direction.DOWN, steps: 0 },
];

function nextCoord(x: number, y: number, d: Direction) {
  if(d === Direction.RIGHT) return [x + 1, y];
  if(d === Direction.LEFT) return [x - 1, y];
  if(d === Direction.UP) return [x, y - 1];
  return [x, y + 1];
}

function isOutOfBounds (x: number, y: number, grid: number[][]){
 return (y >= grid.length || y < 0 || x >= grid[0].length || x < 0);
}

while(queue.length !== 0) {

  // Get the path with current lowest cost
  let { heatLoss, x, y, direction, steps } = queue.sort(sortQueue).shift();

  // Check if we've travelled here before (loop check)
  const key = j([x, y, direction, steps]);
  if(visited.has(key)) continue;
  visited.add(key);

  // Reached the goal?
  if(y == grid.length-1 && x === grid[0].length-1){
    console.log(heatLoss);
    break;
  }

  // Is a step in the same direction valid?
  if (steps < 3){
    let [newX, newY ] = nextCoord(x, y, direction)

    if(!isOutOfBounds(newX, newY, grid)){
      queue.push({ heatLoss: heatLoss + grid[newY][newX], x: newX, y: newY, direction, steps: steps+1})
    }
  }

  // Add the other valid steps
  for ( let newDirection of [Direction.LEFT, Direction.RIGHT, Direction.UP, Direction.DOWN]) {
    // Same direction handled above
    if(newDirection === direction) continue;
    // Can't go opposite direction
    if(newDirection === Direction.LEFT && direction === Direction.RIGHT) continue;
    if(newDirection === Direction.RIGHT && direction === Direction.LEFT) continue;
    if(newDirection === Direction.UP && direction === Direction.DOWN) continue;
    if(newDirection === Direction.DOWN && direction === Direction.UP) continue;

    const [newX, newY] = nextCoord(x, y, newDirection)

    if(!isOutOfBounds(newX, newY, grid)){
      queue.push({ heatLoss: heatLoss + grid[newY][newX], x: newX, y: newY, direction: newDirection, steps: 1})
    }

  }

}
