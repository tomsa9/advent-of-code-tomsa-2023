const fs = require('fs');

const filePath = 'example2';
const board= fs.readFileSync(filePath).toString().split('\n').map(x => x.trim().split(''))

const [startX, startY] = board.flatMap((row, y) => row.flatMap((cell, x) => cell === 'S' ? [x, y] : []))
board[startY][startX] = 'F'
console.log(startX, startY)

// console.log(board)

function neighbors(graph, x, y) {
    const north = new Set(['|', '7', 'F'])
    const east = new Set(['-', 'J', '7'])
    const west = new Set(['-', 'L', 'F'])
    const south = new Set(['|', 'L', 'J'])

    const current = graph[y][x]
    const acc = []
    if (current === '|' || current === 'S') {
        try { if (south.has(graph[y + 1][x])) acc.push([x, y + 1]) } catch (e) {}
        try { if (north.has(graph[y - 1][x])) acc.push([x, y - 1]) } catch (e) {}
    }
    if (current === '-' || current === 'S') {
        try { if (west.has(graph[y][x - 1])) acc.push([x - 1, y]) } catch (e) {}
        try { if (east.has(graph[y][x + 1])) acc.push([x + 1, y]) } catch (e) {}
    }
    if (current === 'L' || current === 'S') {
        try { if (north.has(graph[y - 1][x])) acc.push([x, y - 1]) } catch (e) {}
        try { if (east.has(graph[y][x + 1])) acc.push([x + 1, y]) } catch (e) {}
    }
    if (current === 'J' || current === 'S') {
        try { if (north.has(graph[y - 1][x])) acc.push([x, y - 1]) } catch (e) {}
        try { if (west.has(graph[y][x - 1])) acc.push([x - 1, y]) } catch (e) {}
    }
    if (current === '7' || current === 'S') {
        try { if (south.has(graph[y + 1][x])) acc.push([x, y + 1]) } catch (e) {}
        try { if (west.has(graph[y][x - 1])) acc.push([x - 1, y]) } catch (e) {}
    }
    if (current === 'F' || current === 'S') {
        try { if (south.has(graph[y + 1][x])) acc.push([x, y + 1]) } catch (e) {}
        try { if (east.has(graph[y][x + 1])) acc.push([x + 1, y]) } catch (e) {}
    }
    return acc
}

const flip = (graph, x, y) => {
    if (graph[y] && graph[y][x] !== Infinity) return
    if (graph[y] && graph[y][x]) graph[y][x] = graph[y][x] === Infinity ? -1 : graph[y][x] - 1
    try { if (graph[y + 1][x] === Infinity) {
        flip(graph, x, y + 1)
    } } catch (e) {}
    try { if (graph[y - 1][x] === Infinity) {
        flip(graph, x, y - 1)
    } } catch (e) {}
    try { if (graph[y][x - 1] === Infinity) {
        flip(graph, x - 1, y)
    } } catch (e) {}
    try { if (graph[y][x + 1] === Infinity) {
        flip(graph, x + 1, y)
    } } catch (e) {}
}

function bfs(graph, start) {
    const boardDistances = board.map((row) => row.map(() => Infinity))
    const queue = [[start, 0]];
    boardDistances[start[1]][start[0]] = 0
    while (queue.length) {
        const [loc, step] = queue.shift();
        const [x, y] = loc

        for (const [x2, y2] of neighbors(graph, x, y)) {
            if (boardDistances[y2][x2] < step + 1) continue
            queue.push([[x2, y2], step + 1]);
            boardDistances[y2][x2] = Math.min(boardDistances[y2][x2], step + 1);
        }
        // console.log(boardDistances)
    }

    return boardDistances;
}


const result = bfs(board, [startX, startY]);
// console.log(result)
//
// console.log(result.reduce((max, row) => Math.max(max, row.reduce((acc, cell) => Math.max(acc, (cell === Infinity ? 0 : cell)), 0)), -1))
const acc = board.map((row) => row.map(() => []))
for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
        if (result[i][j] < Infinity) {
            if (board[i][j] === 'L') {
                acc[i][j] = ([
                    [' ', '|', ' '],
                    [' ', 'L', '-'],
                    [' ', ' ', ' ']
                ])
            }
            if (board[i][j] === 'J') {
                acc[i][j] = ([
                    [' ', '|', ' '],
                    ['-', 'J', ' '],
                    [' ', ' ', ' ']
                ])
            }
            if (board[i][j] === 'F') {
                acc[i][j] = ([
                    [' ', ' ', ' '],
                    [' ', 'F', '-'],
                    [' ', '|', ' ']
                ])
            }
            if (board[i][j] === '7') {
                acc[i][j] = ([
                    [' ', ' ', ' '],
                    ['-', '7', ' '],
                    [' ', '|', ' ']
                ])
            }
            if (board[i][j] === '|') {
                acc[i][j] = ([
                    [' ', '|', ' '],
                    [' ', '|', ' '],
                    [' ', '|', ' ']
                ])
            }
            if (board[i][j] === '-') {
                acc[i][j] = ([
                    [' ', ' ', ' '],
                    ['-', '-', '-'],
                    [' ', ' ', ' ']
                ])
            }
        } else {
            acc[i][j] = ([
                ['.', '.', '.'],
                ['.', '.', '.'],
                ['.', '.', '.']
            ])
        }
    }
}
console.log(acc)
// console.log(result)
//
//
// const allIndices = result.flatMap((row, y) => row.map((cell, x) => [cell, [x, y]])).filter(([cell, [x, y]]) => cell === Infinity)
// console.log(allIndices.filter(([cell, [x, y]]) => contained(result, x, y)).length)

// console.log(result.flatMap((row, y) => row.flatMap((cell, x) => cell === -Infinity ? [cell] : [])).length)
