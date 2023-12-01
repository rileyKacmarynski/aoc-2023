import { readFileSync } from 'fs'

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const

const input = readFileSync('./day1/day1-input.txt', 'utf-8')
  .split('\n')
  .map((line) =>
    Array.from(line).reduce((numbers, char, index) => {
      const maybeNumber = Number(char)
      if (!Number.isNaN(maybeNumber)) {
        return [numbers[0] ?? maybeNumber, maybeNumber]
      } else {
        const word = line.slice(index, line.length + 1)
        for (const [key, value] of Object.entries(numberWords)) {
          if (word.indexOf(key) === 0) {
            return [numbers[0] ?? value, value]
          }
        }
      }

      return numbers
    }, [] as number[])
  )
  .reduce((sum, next) => sum + parseInt(next.join(''), 10), 0)

console.log(input)
