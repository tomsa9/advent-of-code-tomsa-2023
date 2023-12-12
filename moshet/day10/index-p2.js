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

const getMoveArrow = (move, prevMove) => {
    if(move.r>0 && prevMove.r>0)
        return "↓";
    if(move.r<0 && prevMove.r<0)
        return "↑";
    if(move.c>0 && prevMove.c>0)
        return "→";
    if(move.c<0 && prevMove.c<0)
        return "←";
    if(move.c<0 && prevMove.r<0)
        return "↰";
    if(move.c>0 && prevMove.r<0)
        return "↱";
    if(move.c>0 && prevMove.r>0)
        return "↳";
    if(move.c<0 && prevMove.r>0)
        return "↲";
    if(move.r<0 && prevMove.c>0)
        return "↗";
    if(move.r<0 && prevMove.c<0)
        return "↖";
    if(move.r>0 && prevMove.c<0)
        return "↙";
    if(move.r>0 && prevMove.c>0)
        return "↘";
    return "?";
};
const symbolDirections = {
    "↓": ["down"],
    "↑": ["up"],
    "→": ["right"],
    "←": ["left"],
    "↰": ["up", "left"],
    "↖": ["up", "left"],
    "↱": ["up", "right"],
    "↗": ["up", "right"],
    "↳": ["down", "right"],
    "↘": ["down", "right"],
    "↲": ["down", "left"],
    "↙": ["down", "left"]
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
let pipeLoopMap = [];
let currentPosition = [...animalPosition];
let currentMove = { r:1, c: 0};
let loopBoundaries;
const updateLoopBoundaries = (r,c) => {
    if(!loopBoundaries)
        return [[r,r],[c,c]];
    else
        return [
            [ Math.min(r,loopBoundaries[0][0]), Math.max(r,loopBoundaries[0][1]) ],
            [ Math.min(c,loopBoundaries[1][0]), Math.max(c,loopBoundaries[1][1]) ],
        ];
};
do {
    const [r,c] = currentPosition;
    if(!pipeLoopMap[r]) {
        pipeLoopMap[r] = [];
    }
    loopBoundaries = updateLoopBoundaries(r, c);
    currentPosition = [r+currentMove.r, c+currentMove.c, {...currentMove}, pipeMap[r][c]];
    pipeLoop.push(currentPosition);
    pipeLoopMap[r][c] = {symbol: pipeMap[r][c], move: {...currentMove}, index: pipeLoop.length-1};
    const symbol = pipeMap[currentPosition[0]][currentPosition[1]];
    const nextMoves = symbolMoves[symbol];
    ["r","c"].map(move => {
        const nextMove = nextMoves[move].filter(direction => direction === currentMove[move] || Math.abs(direction + currentMove[move])!==0);
        currentMove[move] = nextMove[0] || 0;
    });
    console.log(symbol, currentMove, currentPosition);
} while ( !isEqualPos(currentPosition, animalPosition) );
// console.log(pipeLoop.length/2)
console.log(loopBoundaries);

for(let r = loopBoundaries[0][0]; r<=loopBoundaries[0][1]; r++) {
    for(let c = loopBoundaries[1][0]; c<=loopBoundaries[1][1]; c++) {
        pipeLoopMap[r][c] = pipeLoopMap[r][c] || {symbol: ",", move: { r:0, c: 0}};
    }
}

const printMap = () => console.log(pipeLoopMap.map(row => row.map(item => item.symbol).join("")).join("\n"));
printMap();

let enclosedArea = 0;
for(let r = loopBoundaries[0][0]; r<=loopBoundaries[0][1]; r++) {
    let isInLoop = false;
    let area = 0;
    let updateCells = [];
    for(let c = loopBoundaries[1][0]; c<=loopBoundaries[1][1]; c++) {
        const cell = pipeLoopMap[r][c];
        const possibleMoves = symbolMoves[ cell.symbol ];
        if( possibleMoves ) {
            const prevCellIndex = (cell.index-1)<0 ? pipeLoop.length-1 : cell.index-1;
            const prevCell = pipeLoop[prevCellIndex];
            const prevCellMove = prevCell[2];
            const cellMoveR = cell.move.r || prevCellMove.r;
            cell.symbol= getMoveArrow(cell.move, prevCellMove);
            const isEndLoop = !symbolDirections[cell.symbol].includes("down");

            if(isInLoop) {
                if(isEndLoop) {
                    enclosedArea += area;
                    updateCells.map(func => func());
                }
                area = 0;
                updateCells = [];
            }
            isInLoop = !isEndLoop;
        }
        else if( isInLoop && cell.symbol==="," ) {
            area++;
            updateCells.push(() => pipeLoopMap[r][c].symbol="B");
        }
    }
}

printMap();
console.log(enclosedArea);