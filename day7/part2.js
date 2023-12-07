const fs = require('fs');

const filePath = 'input2';
const numberRegex = /\d+/g
const input= fs.readFileSync(filePath).toString().split('\n')

const powerMap = {
    'T': 10,
    'J': 1,
    'Q': 12,
    'K': 13,
    'A': 14
}

const cardsMap = hand => {
    const map = {}
    hand.forEach(card => {
        if (map[card]) map[card]++
        else map[card] = 1
    })
    return map
}

const fiveOfAKind = hand => {
    const jokers = cardsMap(hand)['J'] ?? 0
    for (const [card, value] of Object.entries(cardsMap(hand))) {
        const count = card === 'J' ? value : value + jokers
        if (count === 5) return true
    }
    return false
}

const fourOfAKind = hand => {
    const jokers = cardsMap(hand)['J'] ?? 0
    for (const [card, value] of Object.entries(cardsMap(hand))) {
        const count = card === 'J' ? value : value + jokers
        if (count === 4) return true
    }
    return false
}

// 111 22 V
// 11J 22 V
// 1JJ 22 four of a kind
// JJJ 22 five of a kind
// 111 2J four of a kind
// 111 JJ five of a kind

const fullHouse = hand => {
    let foundThree = false
    let foundTwo = false
    const jokers = cardsMap(hand)['J'] ?? 0
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 2) foundTwo = true
        if (value === 3) foundThree = true
    }
    const foundWithJokers = JSON.stringify(Object.entries(cardsMap(hand)).map(([card, value]) => { return value }).sort()) === JSON.stringify([1, 2, 2]) && jokers === 1
    return (foundTwo && foundThree) || foundWithJokers
}

const threeOfAKind = hand => {
    const jokers = cardsMap(hand)['J'] ?? 0
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value + jokers === 3) return true
    }
    return false
}

const twoPair = hand => {
    let foundTwo = false
    let foundAnotherTwo = false
    for (const [, count] of Object.entries(cardsMap(hand))) {
        if (count === 2 && !foundTwo) foundTwo = true
        else if (count === 2) foundAnotherTwo = true
    }
    return foundTwo && foundAnotherTwo
}

const onePair = hand => {
    const jokers = cardsMap(hand)['J'] ?? 0
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value + jokers === 2) return true
    }
    return false
}

const highCard = hand => {
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value !== 1) return false
    }
    return true
}

const power = (card) => {
    if (powerMap[card]) return powerMap[card]
    else return parseInt(card)
}

const hands = input.map(x => {
    const [cardsUnsplit, bid] = x.trim().split(' ')
    const cards = cardsUnsplit.split('')
    return {cards, bid: parseInt(bid)}
})

const compareHands = (hand1, hand2) => {
    const funcs = [fiveOfAKind, fourOfAKind, fullHouse, threeOfAKind, twoPair, onePair, highCard]
    if (JSON.stringify(hand1.cards) === JSON.stringify('Q2KJJ'.split('')))
        console.log("hi")
    for (let i = 0; i < funcs.length; i++) {
        const func = funcs[i]
        const hand1Result = func(hand1.cards)
        const hand2Result = func(hand2.cards)
        if (hand1Result && !hand2Result) return 1
        else if (!hand1Result && hand2Result) return -1
        else if (hand1Result && hand2Result) break
    }
    for (let i = 0; i < hand1.cards.length; i++) {
        const [card1, card2] = [power(hand1.cards[i]), power(hand2.cards[i])]
        if (card2 > card1) return -1
        else if (card2 < card1) return 1
    }
    return 0
}

const sortedHands = hands.sort(compareHands)
console.log(sortedHands)

const result = sortedHands.reduce((acc, {cards, bid}, index) => acc + ((index + 1) * bid), 0)

console.log("result: " + result)