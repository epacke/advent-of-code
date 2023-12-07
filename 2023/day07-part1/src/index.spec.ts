import {describe, expect, test} from '@jest/globals';
import { Game } from './index';

const simpleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe('Parse row', () => {
  test('Pair', () => {
    const hand = new Game('32T3K', 765)
    expect(hand.calculateScore())
      .toEqual(20)
  });
  test('Three of a kind', () => {
    const hand = new Game('T55J5', 684)
    expect(hand.calculateScore())
      .toEqual(40)
  });
  test('Two pair', () => {
    const hand = new Game('KK677', 28)
    expect(hand.calculateScore())
      .toEqual(30)
  });

  test('Two pair', () => {
    const hand = new Game('KTJJT', 220)
    expect(hand.calculateScore())
      .toEqual(30)
  });
  test('Four of a kind', () => {
    const hand = new Game('QQQQJA', 483)
    expect(hand.calculateScore())
      .toEqual(60)
  });
  test('Five of a kind', () => {
    const hand = new Game('QQQQQ', 483)
    expect(hand.calculateScore())
      .toEqual(70)
  });
  test('Full house', () => {
    const hand = new Game('QQQKK', 483)
    expect(hand.calculateScore())
      .toEqual(50)
  });
  test('High card 5', () => {
    const hand = new Game('2345', 483)
    expect(hand.calculateScore())
      .toEqual(1)
  });
  test('High card Ace', () => {
    const hand = new Game('234A', 483)
    expect(hand.calculateScore())
      .toEqual(1)
  });
});
