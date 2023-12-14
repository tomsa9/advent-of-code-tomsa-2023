const fs = require('fs');
const filePath = 'input2';
let input= fs.readFileSync(filePath).toString().split('\n').map(x => x.trim().split('').map(x => {
    return {
        c: x, xOffset: 0, yOffset: 0
    }
}))
const addition = 1000000

function addSpaces(input, xOffset, yOffset) {
    for (let y = 0; y < input.length; y++) {
        if (input[y].map(c => c.c).includes('#')) continue
        input[y] = input[y].map(i => {
            return {c: i.c, xOffset: i.xOffset + xOffset, yOffset: i.yOffset + yOffset}
        })
    }
    return input
}

// From internet
function transpose(matrix) {
    return matrix.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}

input = transpose(addSpaces(transpose(addSpaces(input, 0, addition - 1)), addition - 1, 0))

const galaxies = input.reduce((acc, row, y) => [...acc, ...row.reduce((acc, cell, x) => cell.c === '#' ? [...acc, [x,y]] : acc, [])], [])
console.log(galaxies)

console.log(galaxies.reduce((acc, [x, y], i) => acc + (galaxies.slice(i + 1).reduce((acc, [x2, y2]) =>
    acc + Math.abs(x2 - x) + Math.abs(y2 - y) +
    input[y].slice(Math.min(x, x2), Math.max(x, x2)).reduce((acc, cell) => acc + cell.xOffset, 0) +
    input.slice(Math.min(y, y2), Math.max(y, y2)).reduce((acc, row) => acc + row[x].yOffset, 0), 0)), 0))