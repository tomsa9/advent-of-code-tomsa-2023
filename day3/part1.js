const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split("\n")
const numberRegex = /\d+/g
const isChar = (x, y) => {
    return x >= 0 && y >= 0 && y < input.length && x < input[y].length && input[y][x] !== '.' && input[y][x] !== '\n' && isNaN(parseInt(input[y][x]))
}

let acc = 0

input.forEach((row, y) => {
    const match = [...row.matchAll(numberRegex)]
    match.forEach((match) => {
        let hasNeighbor = false
        for (let x = match.index; x <= match.index - 1 + match['0'].length; x++) {
            if (isChar(x - 1, y) || isChar(x + 1, y) || isChar(x, y - 1) || isChar(x, y + 1) ||
                isChar(x - 1, y - 1) || isChar(x - 1, y + 1) || isChar(x + 1, y - 1) || isChar(x + 1, y + 1)) {
                hasNeighbor = true
            }
        }
        console.log(match[0] + " " + hasNeighbor)
        if (hasNeighbor) acc += parseInt(match['0'])
    })
})
console.log(acc)