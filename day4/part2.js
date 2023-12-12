const fs = require('fs');

const filePath = 'input2';
const input= fs.readFileSync(filePath).toString().split("\n")

let cards = []
let rounds = []
let counts = []
input.forEach(row => {
    const afterColumn = row.substring(row.indexOf(':') + 1)
    const [card, round] = afterColumn.split('|').map(x => x.trim())
    cards.push(card.split(' '))
    const modifiedRound = round.split(' ').filter(x => x !== '')
    rounds.push(modifiedRound)
    counts.push(1)
})

cards.forEach((card, idx) => {
    const round = rounds[idx]
    let count = 0
    card.forEach(number => {
        count += round.filter(x => x === number).length
    })
    for (let i = idx + 1; i < idx + 1 + count; i++) {
        counts[i] += counts[idx]
    }
})
console.log(counts.reduce((acc, count) => acc + count, 0))