const fs = require('fs');

const filePath = 'input2';
const input= fs.readFileSync(filePath).toString().split("\n")
const numberRegex = /\d+/g
let m = {}
input.forEach((row, y) => {
    const match = [...row.matchAll(numberRegex)]
    match.forEach((match) => {
        for (let x = match.index; x <= match.index - 1 + match['0'].length; x++) {
            m[[x, y]] = parseInt(match['0'])
        }
    })
})

let acc2 = 0

input.forEach((row, y) => {
    row.split('').forEach((char, x) => {
        if (char !== '*') return
        let neighbors = [
            m[[x - 1, y]],
            m[[x + 1, y]],
            undefined,
            m[[x - 1, y - 1]],
            m[[x, y - 1]],
            m[[x + 1, y - 1]],
            undefined,
            m[[x - 1, y + 1]],
            m[[x, y + 1]],
            m[[x + 1, y + 1]],
        ]
        let neighborsAcc = []
        for (let i = 0; i < neighbors.length; i++) {
            if (neighbors[i] === neighbors[i + 1] || !neighbors[i]) continue
            neighborsAcc.push(neighbors[i])
        }
        console.log(neighborsAcc)
        if (neighborsAcc.length === 2) acc2 += neighborsAcc[0] * neighborsAcc[1]
    })
})
console.log(acc2)