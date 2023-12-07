import {describe, expect, test} from '@jest/globals';
import { Hand, compare } from './index';

const simpleInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

// Five of a kind: 7
// Four of a kind: 6
// Full house: 5
// Three of a kind: 4
// Two pair: 3
// Pair: 2
// Else: 1

describe('Parse row', () => {
  test('Pair', () => {
    const hand = new Hand('32T3K 765')
    expect(hand.calculateScore())
      .toEqual(2)
  });
  test('Four of a kind', () => {
    const hand = new Hand('T55J5 684')
    expect(hand.calculateScore())
      .toEqual(6)
  });
  test('Two pair', () => {
    const hand = new Hand('KK677 28')
    expect(hand.calculateScore())
      .toEqual(3)
  });

  test('Four of a kind', () => {
    const hand = new Hand('KTJJT 220')
    expect(hand.calculateScore())
      .toEqual(6)
  });
  test('Five of a kind', () => {
    const hand = new Hand('QQQQJ 483')
    expect(hand.calculateScore())
      .toEqual(7)
  });
  test('Five of a kind', () => {
    const hand = new Hand('QQQQQ 483')
    expect(hand.calculateScore())
      .toEqual(7)
  });
  test('Full house', () => {
    const hand = new Hand('QQQKK 483')
    expect(hand.calculateScore())
      .toEqual(5)
  });
  test('High card 5', () => {
    const hand = new Hand('23456 483')
    expect(hand.calculateScore())
      .toEqual(1)
  });
  test('High card Ace', () => {
    const hand = new Hand('234A6 483')
    expect(hand.calculateScore())
      .toEqual(1)
  });
  test('Handle JJJJJ', () => {
    const higherHand = new Hand('AAAAA 483')
    const lowerHand = new Hand('JJJJJ 222')
    expect([lowerHand, higherHand].sort(compare)[0])
      .toEqual(lowerHand)
  });
  test('Compare Joker infused house of cards', () => {
    const higherHand = new Hand('AAATT 483')
    const lowerHand = new Hand('JAATT 222')
    expect([lowerHand, higherHand].sort(compare)[0])
      .toEqual(lowerHand)
  });

});
