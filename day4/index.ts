import { readFileSync } from 'fs'

const input = readFileSync('./day4/input.txt', 'utf-8')

const smallInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`

let counter = 0
const games = input.split('\n')
for (let i = 0; i < games.length; i++) {
  doStuff(games, i)
}

function doStuff(games: string[], i: number) {
  counter++
  const [winners, mine] = games[i]
    .split(':')[1]
    .split('|')
    .map((v) => v.trim().split(' '))
    .map((v) => v.filter((x) => x !== ''))

  const winCount = winners.filter((v) => mine.includes(v)).length

  if (winCount) {
    // console.log('got a winner card ', i + 1, ' count ', winCount)
    // total += Math.pow(2, winCount - 1)
    for (let j = i + 1; j < i + winCount + 1; j++) {
      doStuff(games, j)
    }
  }
}

console.log('cards: ', counter)

// const total = input.reduce((total, line) => {
//   const [winners, mine] = line
//     .split(':')[1]
//     .split('|')
//     .map((v) => v.trim().split(' '))
//     .map((v) => v.filter((x) => x !== ''))

//   const winCount = winners.filter((v) => mine.includes(v)).length

//   if (winCount) {
//     total += Math.pow(2, winCount - 1)
//   }

//   return total
// }, 0)

// console.log(total)
