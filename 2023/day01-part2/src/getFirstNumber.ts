export default function getFirstNumber(line: string): string {
  const numString = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  }

  let earliestIndex = line.length - 1;
  let firstNumber = ''
  const numbers = [ ...Object.keys(numString), '1','2','3','4','5','6','7','8','9','10'];

  numbers.forEach(n => {
    const i = line.indexOf(n)
    if(i != -1 && i <= earliestIndex){
      earliestIndex = i
      firstNumber = n;
    }
  })

  return numString[firstNumber] || firstNumber;

}

