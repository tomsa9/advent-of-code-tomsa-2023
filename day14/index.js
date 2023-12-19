const field = require("./input").split("\n").map(row => [...row]);

const printField = (field) => console.log(field.map(row => row.join('')).join("\n"));

const rollStone = (originalR,c) => {
    let load = field.length-originalR;
    if(originalR===0)
        return load;
    for(let r=originalR-1; r>=0 && field[r][c]==="."; r--) {
        field[r][c] = "O";
        load = field.length-r;
        field[r+1][c] = ".";
    }
    return load;
};

printField(field);

let result = 0;
for(let r= 0; r<field.length; r++) {
    for(let c = 0; c<field[r].length; c++) {
        if(field[r][c]==="O") {
            result += rollStone(r,c);
        }
    }
}

printField(field);

console.log(result);

