export interface IRound {
  red: number,
  green: number,
  blue: number,
}

export default function parseGame(row: string): any {
  const [, data] = row.split(': ');
  const rounds = data.split('; ');
  return rounds.map(r => {
    const sets = r.split(', ');
    const round: IRound = { red: 0, green: 0, blue: 0};
    sets.forEach(s => {
      const [number, color] = s.split(' ');
      round[color] = parseInt(number)
    })
    return round;
  })
}