const fs = require('fs');

const filePath = 'input2';
const input= fs.readFileSync(filePath).toString().split('\n')
const regex = /[A-Z0-9][A-Z0-9][A-Z0-9]/g

const locations = {}
const instructions = input[0].trim().split('')
let current = []

/* From internet */
function gcd2(a, b) {
    // Greatest common divisor of 2 integers
    if(!b) return b===0 ? a : NaN;
    return gcd2(b, a%b);
}
function gcd(array) {
    // Greatest common divisor of a list of integers
    var n = 0;
    for(var i=0; i <array.length; ++i)
        n = gcd2(array[i], n);
    return n;
}
function lcm2(a, b) {
    // Least common multiple of 2 integers
    return a*b / gcd2(a, b);
}
function lcm(array) {
    // Least common multiple of a list of integers
    var n = 1;
    for(var i= 0; i<array.length; ++i)
        n = lcm2(array[i], n);
    return n;
}
/* */

input.slice(2).forEach(x => {
    if (x === '') return
    const row = x.match(regex)
    locations[row[0]] = {left: row[1], right: row[2]}
    if (row[0][2] === 'A') current.push(row[0])
})
console.log(locations)

let found = false
const startingAmount = current.length
let counter = []
while (current.length !== 0) {
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i]
        for (let j = 0; j < current.length; j++) {
            counter[j] = (counter[j] ?? 0) + 1
            current[j] =
                instruction === 'R' ? locations[current[j]]['right'] :
                instruction === 'L' ? locations[current[j]]['left'] :
                undefined
        }
        current = current.filter(x => x[2] !== 'Z')
    }
}

console.log(lcm(counter))