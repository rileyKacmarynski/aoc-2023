import { readFileSync } from 'fs'

const smallInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

// holy shit I need to apologize to the JS gods for this

const input = readFileSync('./day3/input.txt', 'utf-8')

const mat = input.split('\n').map((row) => row.split(''))
const partNumbers: number[] = []
for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat.length; j++) {
    // how do we figure out the number?
    let value = ''
    let k = j
    while (Number.isInteger(Number(mat[i][k]))) {
      // keep it a string so we can concat
      const num = mat[i][k]
      value = value + num

      k++
    }

    if (value === '') continue

    // mat.forEach((v) => console.log(...v))

    const digits = value.length
    const numberValue = Number(value)
    // console.log('value', numberValue)

    for (let m = i - 1; m <= i + 1; m++) {
      for (let n = j - 1; n < j + digits + 1; n++) {
        if (mat[m] === undefined || mat[m][n] === undefined) {
          continue
        }

        if (/[^\w\s.]/.test(mat[m][n])) {
          partNumbers.push(numberValue)
        }

        // console.log('surround', mat[m][n])
      }
    }

    j = j + digits
  }
}

const answerHopefully = partNumbers.reduce((total, num) => total + num, 0)

// console.log(answerHopefully)

let totalHopefully = 0

mat.forEach((v) => console.log(...v))
for (let i = 0; i < mat.length; i++) {
  for (let j = 0; j < mat.length; j++) {
    if (mat[i][j] === '*') {
      // check for numbers
      // console.log('we found a gear at', i, j)
      const gearNums: string[] = []

      for (let k = i - 1; k <= i + 1; k++) {
        for (let l = j - 1; l <= j + 1; l++) {
          if (isInteger(mat[k][l])) {
            // console.log('we got digit', mat[k][l], ' at ', k, l)

            let left = l
            while (isInteger(mat[k][left - 1])) {
              left--
            }
            let right = l
            while (isInteger(mat[k][right])) {
              right++
            }

            const number = mat[k].slice(left, right).join('')
            if (gearNums.indexOf(number) === -1) {
              // console.log('we got a number', number)
              gearNums.push(number)
            }
          }
        }
      }

      // console.log('gear numbers', gearNums)
      if (gearNums.length > 1) {
        totalHopefully += Number(gearNums[0]) * Number(gearNums[1])
      }
    }
  }
}

console.log(totalHopefully)

function isInteger(value: string) {
  return Number.isInteger(Number(value))
}
