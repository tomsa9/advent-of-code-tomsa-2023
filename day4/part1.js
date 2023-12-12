const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split("\n")

let cards = []
let rounds = []

input.forEach((row, index) => {
    const afterColumn = row.substring(row.indexOf(':') + 1)
    const [card, round] = afterColumn.split('|').map((x) => x.trim())
    cards.push(card.split(' '))
    const modifiedRound =  new Set(round.split(' ').filter(x => x !== ''))
    rounds.push(modifiedRound)
})

let acc = 0
cards.forEach((card, idx) => {
    let score = 0
    const round = rounds[idx]
    card.forEach(number => {
        if (round.has(number)) {
            if (score === 0) score = 1
            else score *= 2
        }
    })
    acc += score
})
console.log(acc)