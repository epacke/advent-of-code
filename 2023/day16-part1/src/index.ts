import {simpleInput, input} from './input'

enum Direction {
  LEFT= 'LEFT',
  RIGHT='RIGHT',
  DOWN='DOWN',
  UP='UP',
}

type Vector = [ x: number, y: number, direction: Direction ]

function isOutOfBound(x: number, y: number, grid: string[][]){
  // Out of bounds resets the attempt
  return (y < 0 || y >= grid.length || x < 0 || x >= grid[y].length)
}

const grid = input.trim().split('\n').map(row => row.split(''));

const start: Vector[] = [[-1, 0, Direction.RIGHT]];
const pathsToTry = new Map<string, Vector[]>()
const seenVectors = new Set<string>()
pathsToTry.set(JSON.stringify(start), start);


let [ y, x, direction ] = [0, -1, Direction.RIGHT];

while(pathsToTry.size !== 0){

  for(let entry of pathsToTry.entries()) {

    const pathKey = entry[0];
    const path = [...entry[1]];

    // Start here
    let [ x, y, direction ] = path[path.length-1];

    while (true) {
      switch (direction.toString()) {
        case 'LEFT':
          x--;
          break;
        case 'RIGHT':
          x++;
          break;
        case 'UP':
          y--;
          break;
        case 'DOWN':
          y++;
          break;
        default:
          throw new Error('Invalid')
      }

      if (isOutOfBound(x, y, grid)) {
        // Remove path
        pathsToTry.delete(pathKey);
        break;
      }

      const vectorStr = JSON.stringify([x, y, direction]);
      if(seenVectors.has(vectorStr)){
        pathsToTry.delete(pathKey);
        break
      } else {
        seenVectors.add(vectorStr)
      }

      const char = grid[y][x];
      if (char === '.') continue;

      if (direction === Direction.RIGHT || direction === Direction.LEFT) {
        if (char === '-') continue;
        if (char === '\\') {
          direction = direction === Direction.RIGHT ? Direction.DOWN : Direction.UP;
          continue;
        }
        if (char === '/') {
          direction = direction === Direction.RIGHT ? Direction.UP : Direction.DOWN;
          continue;
        }
        if (char === '|') {
          pathsToTry.delete(pathKey);
          const nextSteps: Vector[][] = [
            [[x, y, Direction.UP]],
            [[x, y, Direction.DOWN]],
          ]
          nextSteps.forEach(s => {pathsToTry.set(JSON.stringify(s),s)})
          break
        }
      }
      else {
        // Up or down
        if (char === '|') continue;
        if (char === '\\') direction = direction === Direction.DOWN ? Direction.RIGHT : Direction.LEFT;
        if (char === '/') direction = direction === Direction.DOWN ? Direction.LEFT : Direction.RIGHT;
        if (char === '-') {
          pathsToTry.delete(pathKey);
          const nextSteps: Vector[][] = [
            [[x, y, Direction.RIGHT]],
            [[x, y, Direction.LEFT]],
          ]
          nextSteps.forEach(s => {pathsToTry.set(JSON.stringify(s),s)})
          break
        }
      }
    }
  }
}

const uniquePoints = new Set<string>()
seenVectors.forEach(v => {
  const vector = JSON.parse(v)
  const [x, y ] = vector;
  const key = JSON.stringify([x,y]);
  if (!uniquePoints.has(key)) uniquePoints.add(key)
})

console.log(uniquePoints.size)