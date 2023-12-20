import { readFileSync } from 'fs'

const input = readFileSync('./day11/input.txt', 'utf-8')
const smallInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

type Coord = [number, number]

const image = input.split('\n').map((row) => row.split(''))

image.map((m) => console.log(...m))

let galaxyPositions: Coord[] = []

fillBlanks()
replaceWithNumbers()

// console.log(galaxyPositions)

const getDistance = ([x1, y1]: Coord, [x2, y2]: Coord) =>
  Math.abs(x1 - x2) + Math.abs(y1 - y2)

let sum = 0
let pairs = 0
for (let i = 0; i < galaxyPositions.length; i++) {
  for (let j = i + 1; j < galaxyPositions.length; j++) {
    const distance = getDistance(galaxyPositions[i], galaxyPositions[j])

    // console.log(`distance between ${i + 1}  and ${j + 1}  is ${distance}`)
    pairs++

    sum += distance
  }
}

console.log('sum', sum)
console.log('pairs', pairs)

// image.map((m) => console.log(...m))

function fillBlanks() {
  let insertRow: number[] = []
  for (let i = 0; i < image.length; i++) {
    if (image[i].every((v) => v === '.')) {
      // console.log('row', i + 1)
      insertRow.push(i)
    }
  }

  let insertColumn: number[] = []
  for (let i = 0; i < image.length; i++) {
    let empty = true
    for (let j = 0; j < image[i].length; j++) {
      // console.log(`row ${j} column ${i}`)
      if (image[j][i] !== '.') {
        empty = false
      }
    }

    if (empty === true) {
      insertColumn.push(i)
    }
  }

  const sorted = insertRow.sort((a, b) => b - a)
  console.log(sorted)
  for (const index of sorted) {
    const count = image[index].length
    image.splice(index, 0, new Array(count).fill('.'))
  }

  for (const index of insertColumn.sort((a, b) => b - a)) {
    const count = image[index].length
    image.forEach((row, rowIndex) => {
      row.splice(index, 0, '.')
    })
  }
}

function replaceWithNumbers() {
  let count = 1
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      if (image[i][j] === '#') {
        image[i][j] = String(count)
        galaxyPositions.push([i, j])
        count++
      }
    }
  }
}
