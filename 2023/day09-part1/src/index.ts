import input from './input';

class OASIS {
  reading: number[];
  extrapolations: number[][]

  constructor(reading: string) {
    this.reading = reading.split(/ +/).map(n => parseInt(n));
    this.extrapolations = [];
  }

  extraPolateReading = (reading: number[]) => {
    const newReading: number[] = [];
    reading.forEach((n, i) => {
      if(i + 1 === reading.length) return
      newReading.push(reading[i+1] - n);
    })
    return newReading;
  }
                                   
  extrapolate = () => {
    let reading = [...this.reading];
    this.extrapolations = [[...reading]];
    while(true){
      reading = [...this.extraPolateReading(reading)];
      this.extrapolations.push(reading);
      if (reading.every(n => n === 0)) break;
    }
  }

  calculateNextValue = (extrapolations: number[][]) => {
    extrapolations[extrapolations.length-1].push(0);
    let calculation = 0;
    for (let i = extrapolations.length-1; i > 0; i--){
      const extrapolation = extrapolations[i];
      const curLastDigit = extrapolation[extrapolation.length-1];
      const previousRow = extrapolations[i - 1];
      const prevLastDigit = previousRow[previousRow.length-1];
      calculation = curLastDigit + prevLastDigit;
      previousRow.push(calculation);
    }
    return calculation;
  }
}

const sum = input.split(/\n/).map(reading => {
  const o = new OASIS(reading)
  o.extrapolate();
  return o.calculateNextValue(o.extrapolations);
}).reduce((a, b) => a+b)
console.log(sum)