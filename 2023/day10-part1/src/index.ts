import input from './input'

const asciiConverter: {[key: string]: any} =   {
  '|': '\u2503',
  '-': '\u2501',
  'L': '\u2517',
  'J': '\u251B',
  '7': '\u2513',
  'F': '\u250F',
  '.': 'X',
  'S': 'S',
}

export interface ICoordinate {
  y: number,
  x: number,
}

export class Pipe {

}

export class PipeNetwork {

  map: string[][];
  path: ICoordinate[] = [];
  currentPath: ICoordinate[] = [];
  start: ICoordinate;
  possibleMoves: {[key: string]: ICoordinate[]} =
  {
    '|': [{y: 1, x: 0}, {y: -1, x: 0}],
    '-': [ { y: 0, x: 1}, {y: 0, x: -1}],
    'L': [ { y: -1, x: 0}, { y: 0 , x: 1}],
    'J': [ { y: 0, x: -1 }, { y: -1, x: 0}],
    '7': [ { y: 1, x: 0 }, { y: 0, x: -1 }],
    'F': [ { y: 1, x: 0 }, {y: 0, x: 1}],
    '.': [ { y: 0, x: 0 } ],
  }

  constructor(c: string) {
    this.map = c.split('\n').map(s => s.split(''));
    for(let y = 0; y < this.map.length; y++) {
      const line: string[] = this.map[y];
      for(let x = 0; x < line.length; x++) {
        if (this.map[y][x] === 'S') {
          this.start = {y, x}
          break;
        }
      }
    }
  }

  isConnectedTo = (origin: ICoordinate, targetCoordinate): boolean => {
    const { y, x } = targetCoordinate;
    // Test out of bounds
    if(y < 0 || y > this.map.length-1 || x < 0 || x > this.map[0].length-1){
      return false
    }
    const targetPipeType = this.map[y][x];
    if(targetPipeType === 'S'){
      return this.isConnectedTo(targetCoordinate, origin);
    }
    if (targetPipeType === '.'){ return false; };
    const traversals = this.possibleMoves[targetPipeType]
    if (traversals === undefined){
      console.log('')
    }
    const answer =  traversals.some(t => {
      return y + t.y === origin.y && x + t.x === origin.x;
    })
    return answer
  }

  nextSteps = (from: ICoordinate, path): ICoordinate[] => {
    const connectedPipes = [{ y: 1, x: 0 }, {y: -1, x: 0}, {y: 0, x: 1 }, {y: 0, x: -1}]
      .map(c => { return { y: from.y + c.y, x: from.x + c.x } })
      .filter(c => this.isConnectedTo(from, c) && this.isConnectedTo(c, from))
      .filter(c => !path.some(s => s.y == c.y && s.x === c.x))
    return connectedPipes;
  }

  visualize = () => {
    this.map.forEach((line, y) => {
      console.log(line.map((c, x) => {
        if (network.path.some(p => p.x === x && p.y === y)) {
          const symbol: number = asciiConverter[c];
          return symbol;
        } else {
          return c;
        }
      }).join(''));
    })
  }

  isInPath = (coordinate: ICoordinate) => {
    const { y, x } = coordinate;
    return this.path.some(p => p.x === x && p.y === y)
  }
}

const network = new PipeNetwork(input);

network.path = [network.start];
while(true){
  const path = network.path;
  const currentStep = path[path.length-1];
  const nextSteps = network.nextSteps(currentStep, path)
  if(nextSteps.length === 0) break;
  path.push(nextSteps[0]);
}

console.log(network.path.length/2)

