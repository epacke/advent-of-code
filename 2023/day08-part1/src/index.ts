import input from './input';


class StormMap {

  path: string[]
  map: {[key: string]: string[]} = {}

  constructor(map: string){
    const mapArr = map.split(/\n+/g)
    const [ path ] = mapArr;
    this.path = path.split('');
    mapArr.shift();

    mapArr.forEach(step => {
      const [ key, valueArr ] = step.split(' = ');
      this.map[key] = valueArr.replace(/[\(\)]/g, '').split(', ');
    })
  }

}

const map = new StormMap(input);

let stepsTaken = 0

let currentStep = 'AAA'
let currentChoice = 0;

while(currentStep !== 'ZZZ'){
  const choices = map.map[currentStep];
  const choice = map.path[currentChoice] === 'L' ? 0: 1;
  currentStep = choices[choice];
  stepsTaken += 1;
  currentChoice = currentChoice === map.path.length - 1 ? 0: currentChoice + 1;
}

console.log(stepsTaken)