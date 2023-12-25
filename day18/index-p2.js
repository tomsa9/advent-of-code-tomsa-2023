const input = require("./input");
const directions = {"0":"R", "1":"D", "2":"L", "3":"U"};
const plan = input.split("\n").map(row => {
    const [color,distance,dir] = row.match(/\(#([a-z0-9]{5})([0-3])\)/);
    const steps = parseInt(distance,16);
    return [directions[dir], steps];
});

console.log(plan)

let r=0, c=0, minR=0, minC =0, maxR=0, maxC=0;
let map = [{r,c}];
let lagoonLength = 0;
for(let [direction, steps] of plan) {
    steps = Number(steps);
    switch (direction) {
        case "R": c+=steps
        break;
        case "L": c-=steps;
        break;
        case "U": r-=steps;
        break;
        case "D": r+=steps;
        break;
    }
    lagoonLength += steps;

    map.push({r,c});

    minC = Math.min(minC,c);
    minR = Math.min(minR,r);
    maxC = Math.max(maxC,c);
    maxR = Math.max(maxR,r);
}

console.log(map);

const mapArea = map.reduce((sum, node, i) => {
    const nextNode = i<map.length-1 ? map[i+1] : map[0];
    return sum + (node.c * nextNode.r) - (nextNode.c * node.r);
},0)/2;

console.log(mapArea, lagoonLength);
console.log(mapArea + (lagoonLength/2)+1);
// console.log(952408144115);
