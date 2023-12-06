import {describe, expect, test} from '@jest/globals';
import { BoatRace } from './index';

const input = `Time:      7  15   30
Distance:  9  40  200
`;

describe('Winning times', () => {
  test('Race', () => {
    const b = new BoatRace(input);
    expect(b.getFartherThan(9, 7))
      .toEqual(
        [2,3,4,5]
      )
  });

});
