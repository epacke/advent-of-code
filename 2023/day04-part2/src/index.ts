import input from './input';

export class Card {
  cardId: number;
  cardNumbers: number[];
  cardWinners: number[];
  copies: number;

  constructor(rawCard) {
    const [cardIdStr, cardData ] = rawCard.split(': ');
    this.cardId = parseInt(cardIdStr.replace(/[^0-9]/g,''));
    const [cardNumberStr, cardWinnersStr] = cardData.split(/ +\| +/);
    this.cardNumbers = cardNumberStr.split(/ +/g).map(n => parseInt(n));
    this.cardWinners = cardWinnersStr.split(/ +/g).map(n => parseInt(n));
    this.copies = 1;
  }

  public get winningNumbers (): number[] {
    return this.cardNumbers.filter(n => this.cardWinners.includes(n))
  }

  public get points (): number {
    return this.winningNumbers.length === 0 ? 0: Math.pow(2, this.winningNumbers.length-1)
  }
}

function main() {
  let lines = input.split(/\n/g);
  let sum = 0;

  const cards = lines.map(l => new Card(l));
  let totalCards = 0;
  cards.forEach((card, index) => {
    for (let copy = 0; copy < card.copies; copy++) {
      totalCards += 1;
      card.winningNumbers.forEach((n, ni) => {
        cards[index + ni + 1].copies += 1;
      })
    }
  })
  console.log(totalCards)
}

main();