"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodMess = void 0;
const input_1 = __importDefault(require("./input"));
class FoodMess {
    constructor(input) {
        const sections = input.split(/\n\n/g);
        const seeds = sections[0].replace(/^.+: +/, '').split(/ +/g).map(n => parseInt(n));
        // Remove first section
        sections.shift();
        const [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation,] = sections
            .map(s => s.replace(/^.+:\n/, ''))
            .map(n => {
            return n.split(/\n/g).map(sectionLine => {
                return sectionLine.split(/ +/g).map(n => parseInt(n));
            });
        });
        this.data = {
            seeds,
            seedToSoil,
            soilToFertilizer,
            fertilizerToWater,
            waterToLight,
            lightToTemperature,
            temperatureToHumidity,
            humidityToLocation,
        };
    }
    lookUpNextPosition(number, maps) {
        let nextNumber = number;
        let found = false;
        maps.forEach(map => {
            if (found)
                return;
            const [destinationStart, sourceStart, range] = map;
            if (number >= sourceStart && number <= sourceStart + range) {
                const index = number - sourceStart;
                nextNumber = destinationStart + index;
                found = true;
            }
        });
        return nextNumber;
    }
    seedToLocation(seed) {
        let pos = seed;
        const { seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation, } = this.data;
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
        });
        return pos;
    }
}
exports.FoodMess = FoodMess;
function main() {
    const fm = new FoodMess(input_1.default);
    console.log(Math.min(...fm.data.seeds.map(s => {
        return fm.seedToLocation(s);
    })));
}
main();
//# sourceMappingURL=index.js.map