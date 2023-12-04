import input from './input';

export class Card {
  cardId: number;
  cardNumbers: number[];
  cardWinners: number[];

  constructor(rawCard) {
    const [cardIdStr, cardData ] = rawCard.split(': ');
    this.cardId = parseInt(cardIdStr.replace(/[^0-9]/g,''));
    const [cardNumberStr, cardWinnersStr] = cardData.split(/ +\| +/);
    this.cardNumbers = cardNumberStr.split(/ +/g).map(n => parseInt(n));
    this.cardWinners = cardWinnersStr.split(/ +/g).map(n => parseInt(n));
  }

  public get winningNumbers (): number[] {
    return this.cardNumbers.filter(n => this.cardWinners.includes(n))
  }

  public get points (): number {
    return this.winningNumbers.length === 0 ? 0: Math.pow(2, this.winningNumbers.length-1)
  }
}

const lines = input.split(/\n/g);
let sum = 0;
lines.forEach(line => {
  const card = new Card(line);
  sum += card.points;
})

console.log(sum)