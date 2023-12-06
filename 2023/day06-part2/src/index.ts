import input from './input';

export class BoatRace {
  data: {time: number, distance: number};

  constructor(data){
    const [tRow, dRow] = data.split(/\n/);
    const f = (d) => parseInt(d.replace(/.+: +/, '').split(/ +/).join(''));
    const time = f(tRow)
    const distance = f(dRow)
    this.data = {time, distance};
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

console.log(b.getFartherThan(b.data.distance, b.data.time).length)