let field = require("./input").split("\n").map(row => [...row]);

const printField = (field) => console.log("\n"+field.map(row => row.join('')).join("\n")+"\n\n");

const rollStone = (oR, oC, direction) => {
    switch (direction) {
        case "N":
            for(let r=oR-1; r>=0 && field[r][oC]==="."; r--) {
                field[r][oC] = "O";
                field[r+1][oC] = ".";
            }
            break;
        case "S":
            for(let r=oR+1; r<field.length && field[r][oC]==="."; r++) {
                field[r][oC] = "O";
                field[r-1][oC] = ".";
            }
            break;
        case "W":
            for(let c=oC-1; c>=0 && field[oR][c]==="."; c--) {
                field[oR][c] = "O";
                field[oR][c+1] = ".";
            }
            break;
        case "E":
            for(let c=oC+1; c<field[oR].length && field[oR][c]==="."; c++) {
                field[oR][c] = "O";
                field[oR][c-1] = ".";
            }
            break;
    }
};

const calculateLoad = () => field.reduce((sum,row, r) => {
    sum = row.reduce((result, cell, c) => {
        return result + (cell==="O" ? field.length-r : 0);
    },sum);
    return sum;
},0);

printField(field);

const runCycle = () => {
    for(let dir of ["N","W","S","E"]){
        switch (dir) {
            case "N":
            case "W":
                for (let r = 0; r < field.length; r++) {
                    for (let c = 0; c < field[r].length; c++) {
                        if (field[r][c] === "O") {
                            rollStone(r, c, dir);
                        }
                    }
                }
                break;
            case "S":
                for (let r = field.length-1; r>=0; r--) {
                    for (let c = 0; c < field[r].length; c++) {
                        if (field[r][c] === "O") {
                            rollStone(r, c, dir);
                        }
                    }
                }
                break;
            case "E":
                for (let r = 0; r < field.length; r++) {
                    for (let c = field[r].length-1; c>=0; c--) {
                        if (field[r][c] === "O") {
                            rollStone(r, c, dir);
                        }
                    }
                }
                break;
        }
    }
}

const cycles = {};

for(let i= 1; i<=10000; i++) {
    runCycle();
    const load = calculateLoad();
    if(!cycles[load])
        cycles[load] = [];
    else
        cycles[load].push(i-cycles[load][0]);
    cycles[load][0] = i;
    if(i%1000===0) {
        console.log(cycles);
    }
}

const result = Object.entries(cycles).filter(([load,[lastI, diff1, diff2]]) => {
    if(!diff1)
        return false;
    const NUM_CYCLES = 1000000000;
    return (NUM_CYCLES-lastI-diff1)%34===0 || (NUM_CYCLES-lastI-diff2)%34===0 ;
});
console.log(result);

// printField(field);

// console.log(calculateLoad());

