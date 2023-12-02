export interface ILimit {
  red: number,
  green: number,
  blue: number,
}

export default function parseGameSpec(row: string): ILimit {
  const [, data] = row.split(': ');
  const rounds = data.split('; ');
  const limit: ILimit = { red: 0, green: 0, blue: 0 }
  rounds.forEach(r => {
    const sets = r.split(', ');
    sets.forEach(s => {
      const [number, color] = s.split(' ');
      limit[color] = limit[color] < parseInt(number) ? parseInt(number): limit[color]
    })
  })
  return limit;
}