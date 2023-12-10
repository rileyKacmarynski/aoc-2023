import { readFileSync } from 'fs'

const input = readFileSync('./day8/input.txt', 'utf-8')

const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const [stepsString, ...networkStrings] = input
  .split('\n')
  .filter((v) => v !== '')

const steps = stepsString.toLowerCase().split('') as Array<'l' | 'r'>

// console.log(steps)

const networks = networkStrings.reduce((map, n) => {
  const [node, edgesString] = n.split('=').map((v) => v.trim())

  const [l, r] = edgesString
    .replace(/[()]/g, '')
    .split(',')
    .map((v) => v.trim())

  map.set(node, { l, r })

  return map
}, new Map<string, { l: string; r: string }>())

let currentNode = 'AAA'
let i = 0
while (currentNode !== 'ZZZ') {
  const node = networks.get(currentNode)!
  currentNode = node[steps[i % steps.length]]
  i++

  // console.log('current node', node)
  // console.log('next node', currentNode)
}

console.log('steps', i)
