import {describe, expect, test} from '@jest/globals';
import parseGameSpec from './parseGame';

describe('Parse row', () => {
  test('Game parsing', () => {
    expect(parseGameSpec('Game 1: 3 blue, 7 green, 10 red; 4 green, 4 red; 1 green, 7 blue, 5 red; 8 blue, 10 red; 7 blue, 19 red, 1 green'))
      .toEqual(
        {blue: 8, green: 7, red: 19 }
      )
  });

});
