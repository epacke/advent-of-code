import {describe, expect, test} from '@jest/globals';
import getLastNumber from './getLastNumber';

describe('String numbers should be replaced by numbers', () => {
  test('zstrmphtxdvdpsnhpnq4threenbjznsb should be 4', () => {
    expect(getLastNumber('zstrmphtxdvdpsnhpnq4threenbjznsb')).toBe('3');
  });
  test('srqzfsvpfbnsvninetwothree6sixppsmf7rtcrxxth should be 9', () => {
    expect(getLastNumber('srqzfsvpfbnsvninetwothree6sixppsmf7rtcrxxth')).toBe('7');
  });
  test('9g should be 9', () => {
    expect(getLastNumber('9g')).toBe('9');
  });
});