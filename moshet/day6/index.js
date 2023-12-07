const input = require("./input");

const rows = input.split("\n").map(row => [row.split(" ").filter(val => val).slice(1).join("")]);
console.log(rows);
const [times, distances] = rows;
const result = times.reduce((result, time, raceNum) => {
    time = Number(time);
    let min_distance = Number(distances[raceNum]);
    let num_ways = 0;
    for(let i= 1; i<min_distance; i++) {
        const remaining_time = time - i;
        if( remaining_time*i > min_distance ) {
            num_ways++;
        }
        else if(num_ways>0) {
            break;
        }
    }
    console.log(num_ways);
    return result*num_ways;
}, 1);

console.log(result);