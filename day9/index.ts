import { readFileSync } from 'fs'

const input = readFileSync('./day9/input.txt', 'utf-8')

const smallInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

const histories = input.split('\n').map((h) => {
  const sequence = h.split(' ').map((n) => Number(n))
  return Array(sequence)
})

// console.log(histories)

const value = histories
  .map((h) => generateSequence(h, h[0]))
  .map(extrapolateHistory)
  .reduce((sum, history) => {
    const firsSeq = history[0]
    // const nextValue = firsSeq[firsSeq.length - 1]
    const nextValue = firsSeq[0]

    return (sum += nextValue)
  }, 0)

console.log(value)

function generateSequence(history: number[][], sequence: number[]) {
  const nextSequence: number[] = []
  for (let i = 0; i < sequence.length - 1; i++) {
    const difference = sequence[i + 1] - sequence[i]
    nextSequence.push(difference)
  }

  history.push(nextSequence)

  const sum = nextSequence.reduce((n, s) => (n += s))
  if (sum !== 0) {
    generateSequence(history, nextSequence)
  }

  return history
}

function extrapolateHistory(h: number[][]) {
  // h[h.length - 1].push(0)
  // for (let i = h.length - 2; i >= 0; i--) {
  //   const lastSeq = h[i + 1]
  //   const currentSeq = h[i]

  //   const num = lastSeq[lastSeq.length - 1] + currentSeq[currentSeq.length - 1]
  //   // console.log('last number', num)

  //   currentSeq.push(num)
  // }

  h[h.length - 1].unshift(0)
  for (let i = h.length - 2; i >= 0; i--) {
    const lastSeq = h[i + 1]
    const currentSeq = h[i]

    const num = currentSeq[0] - lastSeq[0]

    currentSeq.unshift(num)
  }

  return h
}
