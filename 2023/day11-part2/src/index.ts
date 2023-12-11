import input from './input';

type Point = [number, number];

interface Star {
  id: number,
  coordinate: Point,
  distanceTo: {
    [key: number]: number
  }
}

class Galaxy {
  map: number[][] = [];
  stars: Star[] = []
  factor: number;
  spaceColumns: number[] = [];
  spaceRows: number[] = []

  constructor(map: string, factor: number){
    let starId = 0;
    this.factor = factor - 1;
    this.map = map.split('\n').map((r, y) => r.split('').map((c, x) => {
      if (c === '#'){
        starId++;
        this.stars.push({ id: starId, coordinate: [y, x], distanceTo: {}})
        return starId
      }
      return 0;
    } ));
    this.findSpaceColumns();
    this.findSpaceRows();
  }

  findSpaceColumns = () => {
    for (let x = 0; x < this.map[0].length; x++) {
      if(this.map.every((row, y) => this.map[y][x] === 0)){
        this.spaceColumns.push(x);
      }
    }
  }

  findSpaceRows = () => {
    for (let y = 0; y < this.map.length; y++) {
      if(this.map[y].every((col) => col === 0)) this.spaceRows.push(y)
    }
  }


  // 1 -> 3: 86
  calcDistance = ([ay, ax]: Point, [by, bx]: Point) => {
    const [smallX, bigX] = [ax, bx].sort((a, b) => a-b);
    const [smallY, bigY] = [ay, by].sort((a, b) => a-b);
    assert(smallX <= bigX)
    assert(smallY <= bigY)
    const spaceColumnCount = this.spaceColumns.filter(x => {
      return bigX > x && smallX < x;
    }).length
    const spaceRowCount = this.spaceRows.filter(y => {
      return bigY > y && smallY < y;
    }).length
    return Math.abs(by - ay) + Math.abs(bx - ax) + spaceRowCount*this.factor + spaceColumnCount*this.factor;
  }

  visualize = () => {
    this.map.forEach(r => console.log(r.join('')))
  }
}

function assert(b: boolean) {
  if(!b){
    throw Error()
  }
}

const galaxy = new Galaxy(input.trim(), 1000000);
const handledCombos = new Set<string>()

let sum = 0;
galaxy.stars.forEach((starA, i) => {
  galaxy.stars.forEach((starB) => {

    const combo = [starA.id, starB.id].sort().join('-');
    if(handledCombos.has(combo) || starA.id === starB.id){
      return
    }
    handledCombos.add(combo);
    const distance = galaxy.calcDistance(starA.coordinate, starB.coordinate);
    sum += distance;
  });
})

console.log(sum)
