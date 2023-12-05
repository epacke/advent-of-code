"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const index_1 = require("./index");
const input = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;
const seedToSoilTests = [
    [79, 81],
    [14, 14],
    [55, 57],
    [13, 13]
];
const seedToLocationTests = [
    [79, 82],
    [14, 43],
    [55, 86],
    [13, 35]
];
(0, globals_1.describe)('Test map', () => {
    const fm = new index_1.FoodMess(input);
    seedToSoilTests.forEach(s2s => {
        const [seed, answer] = s2s;
        (0, globals_1.test)(`Seed ${seed} should result in ${answer}`, () => {
            (0, globals_1.expect)(fm.lookUpNextPosition(seed, fm.data.seedToSoil))
                .toEqual(answer);
        });
    });
    seedToLocationTests.forEach(s2l => {
        const [seed, answer] = s2l;
        (0, globals_1.test)(`Seed ${seed} should result in location ${answer}`, () => {
            (0, globals_1.expect)(fm.seedToLocation(seed))
                .toEqual(answer);
        });
    });
});
//# sourceMappingURL=index.spec.js.map