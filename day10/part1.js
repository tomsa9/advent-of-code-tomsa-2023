const fs = require('fs');

const filePath = 'input1';
const board= fs.readFileSync(filePath).toString().split('\n').map(x => x.trim().split(''))

const [startX, startY] = board.flatMap((row, y) => row.flatMap((cell, x) => cell === 'S' ? [x, y] : []))
console.log(startX, startY)

console.log(board)

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
console.log(result)

console.log(result.reduce((max, row) => Math.max(max, row.reduce((acc, cell) => Math.max(acc, (cell === Infinity ? 0 : cell)), 0)), -1))
