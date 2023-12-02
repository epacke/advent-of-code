import input from './input';
import parseGameSpec, {ILimit} from './parseGame'

let sum = 0;
const limits: ILimit = { red: 12, green: 13, blue: 14 };

const s = input.split(/\n/g, ).map((row, i) => {
  const gameNumber = i + 1;
  const limit = parseGameSpec(row)
  const { red, green, blue } = limit;
  return red*green*blue
}).reduce((a,b) => a + b)

console.log(s);