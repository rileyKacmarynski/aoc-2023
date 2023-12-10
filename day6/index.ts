import { readFileSync } from 'fs'

const input = readFileSync('./day6/input.txt', 'utf-8')

const smallInput = `Time:      7  15   30
Distance:  9  40  200
`

const [times, currentRecords] = input
  .split('\n')
  .flatMap((v) => v.split(':'))
  // get the words out of there
  .filter((_, i) => i % 2 !== 0)
  // .map((v) =>
  //   v
  //     .trim()
  //     .split(' ')
  //     .filter((s) => s !== '')
  //     .map((s) => Number(s))
  // )
  .map(
    (v) => Number(v.replace(/\s/g, ''))
    // .filter((s) => s !== '')
    // .map((s) => Number(s))
  )

console.log(times, currentRecords)

// const total = times.reduce((total, time, race) => {
//   const winCount = Array(time)
//     .fill(0)
//     .reduce(
//       (numWins, _, i) =>
//         i * (time - i) > currentRecords[race] ? numWins + 1 : numWins,
//       0
//     )

//   return total * winCount
// }, 1)

let winCount = 0
for (let i = 0; i < times; i++) {
  const racingTime = times - i
  // console.log('racing time', racingTime)

  const distance = i * racingTime

  // console.log('distance', distance)
  if (distance > currentRecords) {
    winCount++
  }
}

console.log('win count', winCount)

// console.log('times', time)
// console.log('distances', distance)
