import {describe, expect, test} from '@jest/globals';
import getFirstNumber from './getFirstNumber';

describe('String numbers should be replaced by numbers', () => {
  test('zstrmphtxdvdpsnhpnq4threenbjznsb should be 4', () => {
    expect(getFirstNumber('zstrmphtxdvdpsnhpnq4threenbjznsb')).toBe('4');
  });
  test('srqzfsvpfbnsvninetwothree6sixppsmfrtcrxxth should be 9', () => {
    expect(getFirstNumber('srqzfsvpfbnsvninetwothree6sixppsmfrtcrxxth')).toBe('9');
  });
  test('mztttgnxdqt4 should be 4', () => {
    expect(getFirstNumber('mztttgnxdqt4')).toBe('4');
  });
});