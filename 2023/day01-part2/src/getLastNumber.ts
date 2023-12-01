export default function getLastNumber(line: string): string {
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

  let lastIndex = 0;
  let lastNumber
  const numbers = [ ...Object.keys(numString), '1','2','3','4','5','6','7','8','9','10'];

  numbers.forEach(n => {
    const i = line.lastIndexOf(n)
    if(i >= lastIndex){
      lastIndex = i
      lastNumber = n;
    }
  })

  return numString[lastNumber] || lastNumber

}

