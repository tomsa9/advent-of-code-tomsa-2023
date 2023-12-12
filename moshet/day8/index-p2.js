const input = require("./input");
const math = require("mathjs");

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
let currentPositions = Object.keys(network).filter(position => position.lastIndexOf("A")===2);
console.log(currentPositions);
// return;
let i = 0;
let steps = 0;
let foundPositions = [];
let maxTogether = [];
while (foundPositions.filter(steps => steps).length!==currentPositions.length) {
    for(let posIndex= 0; posIndex<currentPositions.length; posIndex++) {
        const direction = directions[i];
        // console.log(direction,i, directions.length);
        currentPositions[posIndex] = network[ currentPositions[posIndex] ][direction];
        if( currentPositions[posIndex].lastIndexOf("Z")===2 ) {
            const zPosition = currentPositions[posIndex];
            if(!foundPositions[posIndex]) {
                foundPositions[posIndex] = steps+1;
                console.log({currentPositions, foundPositions});
            }
        }
    }
    i++;
    if(!directions[i]) {
        i = 0;
    }
    steps++;
    if( currentPositions.filter(position => position.indexOf("Z")===2).length>maxTogether.length ) {
        maxTogether = currentPositions.filter(position => position.indexOf("Z")===2);
        console.log(maxTogether.length, maxTogether, steps, foundPositions);
    }
    // console.log(steps);
}
console.log(math.lcm(...foundPositions));
console.log(steps);