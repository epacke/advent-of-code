import input, {simpleInput} from './input';

function hash(string: string) {

  let value = 0

  string.split('').forEach(char => {
    const asciiValue = char.charCodeAt(0);
    value += asciiValue;
    value = value*17;
    value = value % 256;
  })

  return value;

}

let sum = 0;

input.trim().split(',').forEach(word => {
  sum += hash(word);
})

console.log(sum)