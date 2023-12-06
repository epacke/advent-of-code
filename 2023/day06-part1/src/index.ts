import input from './input';

const t = `
Time:      7  15   30
Distance:  9  40  200`

export class BoatRace {
  data: {time: number, distance: number}[] = [];

  constructor(data){
    const [tRow, dRow] = data.split(/\n/);
    const f = (d) => d.replace(/.+: +/, '').split(/ +/).map(d => parseInt(d))
    const times = f(tRow)
    const distances = f(dRow)
    for (let i in times){
      this.data.push({time: times[i], distance: distances[i]});
    }
  }

  getFartherThan(distanceToBeat, raceTime): number[]{
    const winningHoldTimes: number[] = [];
    for (let holdTime = 1; holdTime < raceTime; holdTime++){
      const speed = holdTime
      const distance = (raceTime - holdTime) * speed;
      if(distance > distanceToBeat) winningHoldTimes.push(holdTime)
    }
    return winningHoldTimes;
  }
}

const b = new BoatRace(input);

console.log(
  b.data.map(d => {
  const { time, distance } = d;
  return b.getFartherThan(distance, time).length
}).reduce((a, b) => a*b));