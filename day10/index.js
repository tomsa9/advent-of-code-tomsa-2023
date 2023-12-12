const input = require("./input");

const pipeMap = input.split("\n").map(row => [...row]);

const symbolMoves = {
    "|" : {r: [1,-1], c: []},
    "-" : {r: [], c: [1,-1]},
    "L" : {r: [-1], c: [1]},
    "J" : {r: [-1], c: [-1]},
    "7" : {r: [1], c: [-1]},
    "F" : {r: [1], c: [1]},
    "." : {r: [], c: []},
};

const animalPosition = pipeMap.reduce((result, row, r) => {
    return pipeMap[r].reduce((result, symbol, c) => {
        return symbol==="S" ? [r,c] : result
    }, result);
}, null);

const isEqualPos = (a,b) => a[0] === b[0] && a[1] === b[1];

console.log(animalPosition);

pipeMap[animalPosition[0]][animalPosition[1]] = "7"; //figured out manually

let pipeLoop = [];
let currentPosition = [...animalPosition];
let currentMove = { r:1, c: 0};
do {
    const [r,c] = currentPosition;
    currentPosition = [r+currentMove.r, c+currentMove.c];
    pipeLoop.push(currentPosition);
    const symbol = pipeMap[currentPosition[0]][currentPosition[1]];
    const nextMoves = symbolMoves[symbol];
    ["r","c"].map(move => {
        const nextMove = nextMoves[move].filter(direction => direction === currentMove[move] || Math.abs(direction + currentMove[move])!==0);
        currentMove[move] = nextMove[0] || 0;
    });
    console.log(symbol, currentMove, currentPosition);
} while ( !isEqualPos(currentPosition, animalPosition) );
console.log(pipeLoop.length/2)