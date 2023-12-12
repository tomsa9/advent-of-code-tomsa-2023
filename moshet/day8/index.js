const input = require("./input");

const rows = input.split("\n");
const directions = [...rows[0]];
const network = rows.slice(2).reduce((map, row) => {
    const position = row.substring(0,3);
    map[position] = {"L": row.substring(7,10), "R": row.substring(12,15)};
    return map;
},{});
console.log(network);
// console.log(directions.slice(-10));
// return;
let currentPosition = "AAA";
let i = 0;
let steps = 0;
while (currentPosition!=="ZZZ") {
    const direction = directions[i];
    // console.log(direction,i, directions.length);
    currentPosition = network[currentPosition][direction];
    i++;
    if(!directions[i]) {
        i = 0;
    }
    steps++;
    // console.log(currentPosition,network[currentPosition]);
}
console.log(steps);