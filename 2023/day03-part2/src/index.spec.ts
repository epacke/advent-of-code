import {describe, expect, test} from '@jest/globals';
import { fetchNumber } from './index';

describe('Fetch number', () => {
  test('Number parsing', () => {
    expect(fetchNumber(['..35..633.'], 0, 2)).toEqual({ x: 2, y: 0, number: 35 })
  });
  test('Number parsing middle', () => {
    expect(fetchNumber(['..35..6336'], 0, 8)).toEqual({ x: 6, y: 0, number: 6336 })
  });

});
