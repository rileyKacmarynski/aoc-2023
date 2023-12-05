import { readFileSync } from 'fs'

const input = readFileSync('./day5/input.txt', 'utf-8')

const smallInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

const [seedLine, ...mapStuff] = input.split(/\n\s*\n/)

const seeds = seedLine
  .split(': ')[1]
  .split(' ')
  .map((seed) => Number(seed))

const maps = mapStuff.map((map) =>
  map
    .split(':')[1]
    .split('\n')
    .filter((n) => n !== '')
    .map((v) => v.split(' ').map((n) => Number(n)))
)

let min = Infinity
seeds.map((seed, index) => {
  // if (index > 1) return

  let currentValue = seed

  maps.forEach((map) => {
    // console.log('value', currentValue)
    // find the line in the map that the current value falls within
    // will be undefined if number is outside defined mapping
    const range = map.find((mapLine) => {
      return (
        mapLine[1] <= currentValue && mapLine[1] + mapLine[2] > currentValue
      )
    })

    // console.log('full map', map)
    // console.log('correct map', correctMap)

    currentValue = !range ? currentValue : currentValue - range[1] + range[0]

    // console.log('current value', currentValue)
  })

  min = Math.min(currentValue, min)
  // console.log('final value', currentValue)
})

console.log('min', min)

// seedToSoil.map((s) => console.log(...s))
