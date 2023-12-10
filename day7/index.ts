import { readFileSync } from 'fs'

const input = readFileSync('./day7/input.txt', 'utf-8')

const smallInput = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`

type HandType =
  | 'highCard'
  | 'onePair'
  | 'twoPair'
  | 'threeOfAKind'
  | 'fourOfAKind'
  | 'fullHouse'
  | 'fiveOfAKind'

type HandTypeScoreMap = {
  [key in HandType]: number
}

const handTypeScoreMap: HandTypeScoreMap = {
  highCard: 1,
  onePair: 2,
  twoPair: 3,
  threeOfAKind: 4,
  fullHouse: 5,
  fourOfAKind: 6,
  fiveOfAKind: 7,
}

const cardValues = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'T',
  'J',
  'Q',
  'K',
  'A',
] as const

type Card =
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'T'
  | 'J'
  | 'Q'
  | 'K'
  | 'A'

type Hand = {
  cards: Card[]
  handType: HandType
  bid: number
}

const hands = input
  .split('\n')
  .map((v) => {
    const [cardString, bid] = v.split(' ')

    const cards = cardString.split('') as Card[]

    const type = findHandType(cards)
    // console.log('hand type', type)
    return {
      cards,
      bid: Number(bid),
      handType: type,
    }
  })
  .sort(rankHands)

const total = hands.reduce(
  (total, hand, index) => (total += hand.bid * (index + 1)),
  0
)

console.log(total)

function findHandType(cards: Card[]): HandType {
  const cardMap = cards.reduce((cardMap, card) => {
    const value = cardMap.get(card) ?? 0
    cardMap.set(card, value + 1)

    return cardMap
  }, new Map<Card, number>())

  // console.log('card map', cardMap)

  let threesCount = 0
  let twosCount = 0
  for (let value of cardMap.values()) {
    // console.log('value count', value)

    if (value === 5) {
      return 'fiveOfAKind'
    }
    if (value === 4) {
      return 'fourOfAKind'
    }
    if (value === 3) {
      threesCount++
    }
    if (value === 2) {
      twosCount++
    }
  }

  if (threesCount === 0 && twosCount === 0) {
    return 'highCard'
  }

  if (twosCount === 2) {
    return 'twoPair'
  }

  if (threesCount === 1 && twosCount === 1) {
    return 'fullHouse'
  }

  if (twosCount === 1) {
    return 'onePair'
  }

  return 'threeOfAKind'
}

function rankHands(a: Hand, b: Hand) {
  // console.log('----------------------------')
  // console.log('a', a.cards)
  // console.log('b', b.cards)

  if (handTypeScoreMap[a.handType] > handTypeScoreMap[b.handType]) {
    return 1
  } else if (handTypeScoreMap[a.handType] < handTypeScoreMap[b.handType]) {
    return -1
  }

  // find the next card stuff
  let i = -1
  do {
    i++
    if (cardValues.indexOf(a.cards[i]) > cardValues.indexOf(b.cards[i])) {
      // console.log(`card ${a.cards[i]} is greater than ${b.cards[i]}`)
      return 1
    } else if (
      cardValues.indexOf(a.cards[i]) < cardValues.indexOf(b.cards[i])
    ) {
      // console.log(`card ${a.cards[i]} is less than ${b.cards[i]}`)
      return -1
    }
    // console.log(`card ${a.cards[i]} is the same as ${b.cards[i]}`)
  } while (a.cards[i] === b.cards[i])

  console.log('--------------this should not happen--------------')
  return 0
}
