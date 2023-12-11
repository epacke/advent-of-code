import input from './input';

`
| is a vertical pipe connecting north and south.
- is a horizontal pipe connecting east and west.
L is a 90-degree bend connecting north and east.
J is a 90-degree bend connecting north and west.
7 is a 90-degree bend connecting south and west.
F is a 90-degree bend connecting south and east.
. is ground; there is no pipe in this tile.
S is the starting position of the animal; there is a pipe on this tile, but your sketch doesn't show what shape the pipe has.
`

export interface ICoordinate {
  y: number,
  x: number,
}

export class PipeNetwork {

  map: string[][];
  paths: ICoordinate[][] = [];
  currentPath: ICoordinate[] = [];
  start: ICoordinate;

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

  nextStep = (from: ICoordinate) => {
    const c2c: {[key: string]: ICoordinate[]} =
      {
        '|': [{y: 1, x: 0}, {y: -1, x: 0}],
        '-': [ { y: 0, x: 1}, {y: 0, x: -1}],
        'L': [ { y: -1, x: 0}, { y: 0 , x: 1}],
        'J': [ { y: 0, x: -1 }, { y: -1, x: 0}],
        '7': [ { y: 1, x: 0 }, { y: 0, x: -1 }],
        'F': [ { y: 1, x: 0 }, {y: 0, x: 1}],
        '.': [ { y: 0, x: 0 } ],
      }

    const { y, x } = from;
    const currentPipe = this.map[y][x];

    let possibleExits = c2c[currentPipe];
    if (currentPipe === 'S') {
      possibleExits = [{ y: 1, x: 0 }, {y: -1, x: 0}, {y: 0, x: 1 }, {y: 0, x: -1}].map(coord => {
        const { y: eY, x: eX } = coord;
        return { y: y + eY, x: x + eX };
      })
    }
    const nextSteps: ICoordinate[] = possibleExits.map(exit => {
      const { y: eY, x: eX } = exit;
      return { y: y + eY, x: x + eX }
    })

    const ns = nextSteps.filter(s => !this.currentPath.some(p => s.y === p.y && s.x === p.x))
    return ns
  }


}

const network = new PipeNetwork(input);
