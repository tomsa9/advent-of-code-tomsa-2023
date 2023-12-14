const fs = require('fs');
const filePath = 'input1';
let input= fs.readFileSync(filePath).toString().split('\n').map(x => x.trim().split(''))

function addSpaces(input) {
    for (let y = 0; y < input.length; y++) {
        if (input[y].includes('#')) continue
        input = [...input.slice(0, y), input[y].map(_ => '.'), ...input.slice(y)]
        y++
    }
    return input
}

// From internet
function transpose(matrix) {
    return matrix.reduce((prev, next) => next.map((item, i) =>
        (prev[i] || []).concat(next[i])
    ), []);
}

input = transpose(addSpaces(transpose(addSpaces(input))))

const galaxies = input.reduce((acc, row, y) => [...acc, ...row.reduce((acc, cell, x) => cell === '#' ? [...acc, [x,y]] : acc, [])], [])
console.log(galaxies.reduce((acc, [x, y], i) => acc + (galaxies.slice(i + 1).reduce((acc, [x2, y2]) => acc + Math.abs(x2 - x) + Math.abs(y2 - y), 0)), 0))