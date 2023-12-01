import input from './input';

console.log(
  input.split('\n')
    .map(l => {
      const numbers = l.replace(/[^0-9]/g, '');
      return parseInt(`${numbers[0]}${numbers[numbers.length-1]}`)})
    .reduce((a,b) => { return a + b })
)
