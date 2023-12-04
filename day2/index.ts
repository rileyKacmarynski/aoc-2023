import { readFileSync } from 'fs'

const maxRed = 12
const maxGreen = 13
const maxBlue = 14

const input = readFileSync('./day2/input.txt', 'utf-8')
  .split('\n')
  .reduce((total, line) => {
    let [id, game] = line.split(':')
    id = id.replace('Game ', '')

    console.log('game ', id)

    let minBlue = 0
    let minRed = 0
    let minGreen = 0
    for (const round of game.split(';')) {
      // console.log('\t round', round)

      const blue = totalColor(round, /\d+\sblue/g)
      if (blue > minBlue) {
        minBlue = blue
      }

      const red = totalColor(round, /\d+\sred/g)
      if (red > minRed) {
        minRed = red
      }

      const green = totalColor(round, /\d+\sgreen/g)
      if (green > minGreen) {
        minGreen = green
      }
      // if (green > maxGreen) {
      //   return total
      // }
    }

    // console.log('found valid game ', id, game)
    // return total + Number(id)
    console.log('game ', game)
    console.log('min green', minGreen)
    console.log('min red', minRed)
    console.log('min blue', minBlue)

    return total + minBlue * minRed * minGreen
  }, 0)

console.log(input)

function totalColor(round: string, exp: RegExp) {
  let color = round.match(exp)
  return color ? parseInt(color[0]) : 0
}
