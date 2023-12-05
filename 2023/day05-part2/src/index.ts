import input from './input';
import {simpleInput} from './input';

export class FoodMess {

  public data: {
    seeds: number[];
    seedToSoil: number[][];
    soilToFertilizer: number[][];
    fertilizerToWater: number[][];
    waterToLight: number[][];
    lightToTemperature: number[][];
    temperatureToHumidity: number[][];
    humidityToLocation: number[][];
  }

  constructor(input: string){
    const sections = input.split(/\n\n/g)
    const seeds = sections[0].replace(/^.+: +/,'').split(/ +/g).map(n => parseInt(n));
    // Remove first section
    sections.shift();
    const [
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    ] = sections
      .map(s => s.replace(/^.+:\n/,''))
      .map(n => {
        return n.split(/\n/g).map(sectionLine => {
          return sectionLine.split(/ +/g).map(n => parseInt(n));
        })
      })
    this.data = {
      seeds,
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    }
  }

  lookUpNextPosition (number: number, maps: number[][]) {
    let nextNumber = number
    for (const map of maps) {
      const [destinationStart, sourceStart, range] = map;
      if (number >= sourceStart && number <= sourceStart + range) {
        const index = number - sourceStart;
        nextNumber = destinationStart + index;
        break;
      }
    }
    return nextNumber
  }

  seedToLocation (seed: number): number {
    let pos = seed;
    const {
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation,
    } = this.data;
    [
      seedToSoil,
      soilToFertilizer,
      fertilizerToWater,
      waterToLight,
      lightToTemperature,
      temperatureToHumidity,
      humidityToLocation
    ].forEach((map) => {
      pos = this.lookUpNextPosition(pos, map);
    })
    return pos;
  }

}

function main() {
  const fm = new FoodMess(input);
  const seeds = fm.data.seeds;
  let closesLocation = -1
  for (let i = 0;i < seeds.length; i+=2){
    const [start, range] = [seeds[i], seeds[i+1]];
    const max = start + range;
    for (let j=start; j < max; j++){
      const location = fm.seedToLocation(j)
      if(location < closesLocation || closesLocation === -1){
        closesLocation = location;
      }
    }
  }

  console.log(closesLocation)
}

main()