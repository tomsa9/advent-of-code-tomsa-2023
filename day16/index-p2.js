const grid = require("./input").split("\n").map(row => [...row]);

const directionMap = {
    "/": {
        "E": "N",
        "W": "S",
        "N": "E",
        "S": "W",
    },
    "\\": {
        "E": "S",
        "W": "N",
        "N": "W",
        "S": "E",
    },
    "|": {
        "N": "N",
        "S": "S",
        "E": "NS",
        "W": "NS",
    },
    "-": {
        "N": "EW",
        "S": "EW",
        "E": "E",
        "W": "W",
    }
};

let energizedGrid = {};
const energize = (r, c, direction) => {
    if(!energizedGrid[r]) {
        energizedGrid[r] = {};
    }
    if(!energizedGrid[r][c]) {
        energizedGrid[r][c] = {};
    }
    if(energizedGrid[r][c][direction])
        return false;
    energizedGrid[r][c][direction] = true;
    return true;
};

const spawnBeam = (r,c,direction) => {
    if(!grid[r] || !grid[r][c] || !energize(r,c,direction))
        return;
    const tile = grid[r][c];
    let nextDirections = tile==="." ? [direction] : [...directionMap[tile][direction]];
    for(let nextDir of nextDirections) {
        switch (nextDir) {
            case "N":
                spawnBeam(r-1, c, nextDir);
                break;
            case "S":
                spawnBeam(r+1, c, nextDir);
                break;
            case "E":
                spawnBeam(r, c+1, nextDir);
                break;
            case "W":
                spawnBeam(r, c-1, nextDir);
                break;
        }
    }
};

const configurations = [
    ...Array(grid[0].length).fill([]).map((cell,index) => [0,index,"S"]),
    ...Array(grid[0].length).fill([]).map((cell,index) => [grid.length-1,index,"N"]),
    ...Array(grid.length).fill([]).map((cell,index) => [index,0,"E"]),
    ...Array(grid.length).fill([]).map((cell,index) => [index,grid[0].length-1,"W"]),
];

console.log(configurations);

const result = configurations.reduce((max,conf, i) => {
    energizedGrid = {};
    spawnBeam(...conf);
    const energy = Object.values(energizedGrid).reduce((sum,row) => {
        return sum + Object.keys(row).length;
    },0);
    console.log(i, energy);
    return Math.max(energy,max);
},0);

console.log(result);