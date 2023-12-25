const input = require("./input");
const plan = input.split("\n").map(row => row.split(' '));

let map = {};
let r=0, c=-1, minR=0, minC =-1, maxR=0, maxC=-1;
const dig = (r,c) => {
    if(!map[r])
        map[r] = {};
    map[r][c] = true;
}
for(let [direction, steps] of plan) {
    steps = Number(steps);
    switch (direction) {
        case "R": {
            const finalC = c+steps;
            while(c<finalC) {
                c++;
                dig(r,c);
            }
        }
        break;
        case "L": {
            const finalC = c-steps;
            while(c>finalC) {
                c--;
                dig(r,c);
            }
        }
        break;
        case "U":{
            const finalR = r-steps;
            while(r>finalR) {
                r--;
                dig(r,c);
            }
        }
        break;
        case "D":{
            const finalR = r+steps;
            while(r<finalR) {
                r++;
                dig(r,c);
            }
        }
        break;
    }

    minC = Math.min(minC,c);
    minR = Math.min(minR,r);
    maxC = Math.max(maxC,c);
    maxR = Math.max(maxR,r);
}

// console.log(map);
// process.exit(0);

let grid = Array(maxR-minR);
const rowLength = maxC-minC;

const setInGrid = (r,c) => {
    if(!grid[r])
        grid[r] = Array(rowLength);
    grid[r][c] = "#";
};

for(let r of Object.keys(map)) {
    for(let c of Object.keys(map[r])) {
        setInGrid(r-minR,c-minC);
    }
}

const printGrid = () => {
    let str = "";
    for(let row of grid) {
        for(let c=0; c<row.length; c++) {
            str += row[c] || ".";
        }
        str+="\n";
    }
    console.log(str);
};

const fillLagoonCell = (r,c) => {
    // console.log(r,c);
    grid[r][c] = "#";
    let cellsToFill = [];
    for(let ri= Math.max(0,r-1); ri<=r+1 && ri>=0 && ri<grid.length; ri++) {
        for(let ci= Math.max(0,c-1); ci<=c+1 && ci>=0 && ci<grid.length; ci++) {
            if(!grid[ri][ci])
                cellsToFill.push(ri+"_"+ci);
        }
    }
    return cellsToFill;
};

const fillLagoon = () => {
    for(let r=0; r<grid.length; r++) {
        let inLagoon = false;
        const row = grid[r];
        for(let c=0; c<row.length; c++) {
            if(row[c] && !row[c+1] && !inLagoon) {
                inLagoon = true;
            }
            else if(row[c] && !row[c-1] && inLagoon) {
                row[c] = "#";
                return fillLagoonCell(r,c-1);
            }
        }
    }
};
let cellsToFill = fillLagoon();
console.log(cellsToFill);
printGrid();


while(cellsToFill.length) {
    let cells = new Set([...cellsToFill].flat());
    cellsToFill = Array.from(cells).map((cell) => {
        const [r,c] = cell.split("_");
        return fillLagoonCell(Number(r),Number(c))
    });
    // console.log(window.cellsToFill);
}
printGrid();
const result = grid.reduce((count,row) => row.reduce((num,cell) => num+1, count), 0);
console.log(result);
