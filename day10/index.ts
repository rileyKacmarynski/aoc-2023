import { readFileSync } from 'fs'

const input = readFileSync('./day10/input.txt', 'utf-8')

const smallInput = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...
`

const map = smallInput.split('\n').map((row) => row.split(''))

map.map((m) => console.log(...m))
