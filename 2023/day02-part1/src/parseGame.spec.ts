import {describe, expect, test} from '@jest/globals';
import parseGame from './parseGame';

describe('Parse row', () => {
  test('Game parsing', () => {
    expect(parseGame('Game 1: 3 blue, 7 green, 10 red; 4 green, 4 red; 1 green, 7 blue, 5 red; 8 blue, 10 red; 7 blue, 19 red, 1 green'))
      .toEqual(
        [
          { blue: 3, green: 7, red: 10 },
          { blue: 0, green: 4, red: 4 },
          { blue: 7, green: 1, red: 5 },
          { blue: 8, green: 0, red: 10 },
          { blue: 7, green: 1, red: 19 }
        ]
      )
  });

});
