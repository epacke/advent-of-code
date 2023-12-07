import input from './input';

const CARD_STRENGTH = "AKQT98765432J"
export class Hand {
  handStr: string;
  cards: string[];
  bet: number;
  jokerCount: number;

  constructor(cardStr: string,) {
    const [handStr, bidStr ] = cardStr.split(/ +/);
    this.handStr = handStr;
    this.bet = parseInt(bidStr);
    this.cards = handStr.split('');
    this.jokerCount = handStr === 'JJJJJ' ? 0 : this.cards.filter(c => c === 'J').length;
  }

  calculateScore = () => {
    let cardNum: Map<string, number> = new Map();

    this.cards.forEach(card => {
      const count = cardNum.get(card) || 0;
      cardNum.set(card, count + 1);
    });
    cardNum.delete('J');
    const sorted = Array.from(cardNum.values()).sort((a, b) => b - a);
    sorted[0] += this.jokerCount;
    const [highest, secondHighest] = [sorted[0], sorted[1] || 0];
    if(highest === 5 || this.handStr === 'JJJJJ') { return 7 } // Five of a kind
    if (highest === 4)                            { return 6 } // Four of a kind
    if (highest === 3 && secondHighest === 2)     { return 5 } // Full house
    if (highest === 3)                            { return 4 } // Three of a kind
    if (highest === 2 && secondHighest === 2)     { return 3 } // Two pairs
    if (highest === 2)                            { return 2 } // Pair
    return 1                                                   // Default
  }
}

export const compare = ((handA: Hand, handB: Hand): number => {
  const scoreA = handA.calculateScore();
  const scoreB = handB.calculateScore();

  // Similar score, highest card wins
  if (scoreA === scoreB){
    for (const i in handA.cards) {
      const cardAStrength = CARD_STRENGTH.indexOf(handA.cards[i]);
      const cardBStrength = CARD_STRENGTH.indexOf(handB.cards[i]);
      if (cardAStrength === cardBStrength) {
        continue
      }
      return cardAStrength < cardBStrength ? 1 : -1;
    }
  }

  if(scoreA > scoreB){
    return +1;
  } else {
    return -1;
  }
})

let sum = 0;
const sortedHands = input.split('\n')
  .map(c => new Hand(c))
  .sort(compare)
sortedHands.forEach((h, i) => { sum+=h.bet*(i + 1) })
console.log(sum)