import input from './input';
import parseGame, {IRound} from './parseGame'

let sum = 0;
const limits: IRound = { red: 12, green: 13, blue: 14 };

input.split(/\n/g, ).forEach((row, i) => {
  const gameNumber = i + 1;
  const game = parseGame(row)
  const impossible = game.some(round => {
    return Object.keys(limits).some(color => round[color] > limits[color])
  });
  sum += impossible ? 0: gameNumber;
})

console.log(sum);