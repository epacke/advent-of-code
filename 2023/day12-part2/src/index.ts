import input from './input';

const cache = new Map<string, number>()

export function count(springs: string, numbers: number[]): number {

  if(springs.length === 0) {
    return numbers.length === 0 ? 1 : 0
  }

  if(numbers.length === 0){
    return springs.includes('#') ? 0: 1;
  }

  const k = springs + numbers.join('-');
  if(cache.has(k)){
    return cache.get(k);
  }

  let result = 0;

  // Run remove the dot or question mark and run the function
  if('.?'.includes(springs[0])){
    result += count(springs.slice(1), [...numbers])
  }

  // Leave the question mark and test the block
  if('#?'.includes(springs[0])) {
    // Number is too long and can't fit in the remaining string
    const longEnough = numbers[0] <= springs.length
    const noDots = !springs.slice(0, numbers[0]).includes(".");
    const endOfString = numbers[0] == springs.length;
    // Following character can't be broken
    const followingCharIsNotBroken = springs[numbers[0]] != '#'
    if (longEnough &&
      noDots &&
      (endOfString || followingCharIsNotBroken)
    ) {
      // We have a valid position
      result += count(springs.slice(numbers[0] + 1), [...numbers.slice(1)])
    }
  }
  cache.set(k, result);
  return result;
}

let total = 0

for (const line of input.trim().split('\n')){

  console.log(line)
  let [springs, strNums] = line.split(' ');
  let groups = strNums.split(',').map(n => parseInt(n))
  springs = `${springs}?${springs}?${springs}?${springs}?${springs}`;
  groups = [...groups, ...groups, ...groups, ...groups, ...groups]
  const n = count(springs, [...groups]);
  total += n;
}

console.log(total);
