import input from './input';

// I hope nobody judges me (much) for this
// It worked, but it ain't pretty. :)

export class Card {
  values = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12,
    'K': 13, 'A': 14,
  }

  value: number;

  constructor(value: string) {
    this.value = this.values[value];
  }
}

export class Game {
  cardStr: string;
  cards: Card[] = []
  bid: number;
  cardToCount: {[key: number]: number} = {};

  constructor(hand: string, bid: number) {
    this.cardStr = hand;
    this.bid = bid;
    for(let c of hand){
      this.cards.push(new Card(c))
    }
    this.countCards()
  }

  countCards = () => {
    this.cards.forEach(c => {
      if (c.value in this.cardToCount){
        return;
      }
      this.cardToCount[c.value] = this.cards.filter((d => c.value === d.value)).length;
    })
  }

  calculateScore = () => {

    // Test for five of a kind
    if(Object.values(this.cardToCount).some(n => n === 5)){
      return 70;
    }

    // Test for four of a kind
    if(Object.values(this.cardToCount).some(n => n === 4)){
      return 60;
    }

    const hasThreeOfAKind = Object.values(this.cardToCount).some(n => {
      return n === 3
    });
    const hasTwoOfAKind = Object.values(this.cardToCount).some(n => n === 2);

    // Test for full house
    if(hasTwoOfAKind && hasThreeOfAKind){
      return 50;
    }

    // Three of a kind
    if(hasThreeOfAKind){
      return 40;
    }

    // Test for two pair
    if(Object.values(this.cardToCount).filter(n => n === 2).length === 2){
      return 30;
    }

    // Test for pair
    if(hasTwoOfAKind){
      return 20;
    }

    return 1;
  }

}

const compareGames = (a: Game, b: Game) => {
  const scoreA = a.calculateScore();
  const scoreB = b.calculateScore();

  if (scoreA === scoreB){
    for(let i = 0; i < a.cards.length; i++){
      if (a.cards[i].value === b.cards[i].value){
        continue;
      }
      if (a.cards[i].value < b.cards[i].value){
        return -1
      }
      return + 1
    }
  }
  return scoreA < scoreB ? -1: +1
}

const games = (input.split(/\n/g).map(l => {
  const [handStr, bidStr ] = l.split(/ +/);
  return new Game(handStr, parseInt(bidStr));
}))


const rankedGames = games.sort(compareGames);

let sum = 0;
rankedGames.forEach((g, i) => {
  const rank = i + 1
  sum += g.bid * rank;
})

console.log(sum)