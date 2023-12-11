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

  constructor(map: string){
    let starId = 0;
    this.map = map.split('\n').map((r, y) => r.split('').map((c, x) => {
      if (c === '#'){
        starId++;
        return starId
      }
      return 0;
    } ));
    this.expandRows()
    this.expandColumns()
    this.map.forEach((row, y) => {
      row.forEach((c, x) => {
        if(c !== 0){
          this.stars.push({ id: c, coordinate: [y, x], distanceTo: {}})
        }
      })
    })
  }

  expandColumns = () => {
    for (let x = 0; x < this.map[0].length; x++) {
      const onlySpace = this.map.every((row, y) => this.map[y][x] === 0)
      if(onlySpace){
        this.map.forEach(row => row.splice(x, 0, 0))
        x++
      }
    }
  }

  expandRows = () => {
    const rowLength = this.map[0].length
    for (let y = 0; y < this.map.length; y++) {
      const onlySpace = this.map[y].every((col, y) => col === 0)
      if(onlySpace){
        const newRow = Array.from({ length: rowLength }).map(c => 0)
        this.map.splice(y, 0, newRow);
        y++
      }
    }
  }

  calcDistance = (a: Point, b: Point) => {
    return Math.abs(b[0] - a[0]) + Math.abs(b[1] - a[1]);
  }

  visualize = () => {
    this.map.forEach(r => console.log(r.join('')))
  }
}

const galaxy = new Galaxy(input.trim());
const handledCombos = new Set<string>()

let sum = 0;
galaxy.stars.forEach(starA => {
  galaxy.stars.forEach(starB => {
    const combo = [starA.id, starB.id].sort().join('-');
    if(handledCombos.has(combo) || starA.id === starB.id){
      return
    }
    handledCombos.add(combo);
    const distance = galaxy.calcDistance(starA.coordinate, starB.coordinate);
    sum += galaxy.calcDistance(starA.coordinate, starB.coordinate);
  });
})

console.log(sum)