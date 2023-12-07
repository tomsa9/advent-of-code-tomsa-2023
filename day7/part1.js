const fs = require('fs');

const filePath = 'input1';
const numberRegex = /\d+/g
const input= fs.readFileSync(filePath).toString().split('\n')

const powerMap = {
    'T': 10,
    'J': 11,
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
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 5) return true
    }
    return false
}

const fourOfAKind = hand => {
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 4) return true
    }
    return false
}

const fullHouse = hand => {
    let foundThree = false
    let foundTwo = false
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 2) foundTwo = true
        if (value === 3) foundThree = true
    }
    return foundTwo && foundThree
}

const threeOfAKind = hand => {
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 3) return true
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
    for (const [, value] of Object.entries(cardsMap(hand))) {
        if (value === 2) return true
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
    for (let i = 0; i < funcs.length; i++) {
        const func = funcs[i]
        const hand1Result = func(hand1.cards)
        const hand2Result = func(hand2.cards)
        const result = hand1Result - hand2Result
        if (result !== 0) return result
        if (hand1Result && hand2Result) break
    }
    for (let i = 0; i < hand1.cards.length; i++) {
        const [card1, card2] = [power(hand1.cards[i]), power(hand2.cards[i])]
        const result = card1 - card2
        if (result !== 0) return result
    }
    return 0
}

const sortedHands = hands.sort(compareHands)
console.log(sortedHands)

const result = sortedHands.reduce((acc, {cards, bid}, index) =>
    acc + ((index + 1) * bid)
, 0)

console.log("result: " + result)