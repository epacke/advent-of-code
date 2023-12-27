import {input, simpleInput } from './input'

type Point = [x: number, y: number];

const digInstructions = input.trim().split('\n')
  .map(d => {
    const [direction, length, color] = d.split(' ');
    return {direction, length: parseInt(length), color}
  })

let x = 0;
let y = 0;
let polygon: Point[] = []
let sumPoints = 0;
digInstructions.forEach(d => {
  const {direction, length} = d;
  if(direction === 'R') x += length;
  if(direction === 'L') x -= length;
  if(direction === 'D') y += length;
  if(direction === 'U') y -= length;
  sumPoints += length;
  polygon.push([x, y]);
})

export function index (points: Point[]){
  let sumCriss = 0
  let sumCross: number = 0
  for (let i = 0; i < points.length-1; i++ ){
    const [curX, curY] = points[i];
    const [nextX, nextY] = points[i+1];
    sumCriss+=curX * nextY;
    sumCross+=curY * nextX;
  }
  sumCriss += points[points.length-1][0] * points[0][1];
  sumCross += points[points.length-1][1] * points[0][0];
  return (sumCriss - sumCross)/2;
}

const area = index(polygon);
// Picks theorem
// area = i + b/2 - 1
// integerPoints = area - b/2 + 1
const integerPoints = area - (sumPoints/2) + 1;

console.log(integerPoints + sumPoints)
