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

const validStarts = Object.keys(map.map).filter(s => /A$/.test(s));
const validGoals = Object.keys(map.map).filter(s => /Z$/.test(s));

interface Track {
  currentLocationIndex: string,
  goal: string,
}

const tracks: Track[] = validStarts.map(s => {
  return {
    currentLocationIndex: s,
    goal: validGoals.filter(g => s[0] === g[0] && s[1] === g[1])[0]
  }
})


const steps = tracks.map(track => {
  let pathIndex = 0;
  let stepsTaken = 0
  let oldStepsTaken = 0
  while( true ){

    if(track.currentLocationIndex[2] === 'Z'){
      break;
    }
    let { currentLocationIndex } = track;
    const currentPathChoices = map.map[currentLocationIndex];
    const choiceIndex = map.path[pathIndex] === 'L' ? 0: 1;
    track.currentLocationIndex = currentPathChoices[choiceIndex];
    stepsTaken+=1
    pathIndex = pathIndex === map.path.length - 1 ? 0: pathIndex + 1;
  }
  return stepsTaken;
})

const gcd = (a: number, b: number) => {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}

const res = steps.reduce((n, x) => {
  const gc = gcd(n, x);
  return (n * x)/gc;
});

console.log(res);
