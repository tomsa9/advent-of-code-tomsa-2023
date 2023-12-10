const fs = require('fs');

const filePath = 'input2';
const input= fs.readFileSync(filePath).toString().split('\n')
const regex = /[A-Z0-9][A-Z0-9][A-Z0-9]/g

const locations = {}
const instructions = input[0].trim().split('')
let current = []

input.slice(2).forEach(x => {
    if (x === '') return
    const row = x.match(regex)
    locations[row[0]] = {left: row[1], right: row[2]}
    if (row[0][2] === 'A') current.push(row[0])
})
console.log(locations)

let found = false
let counter = 0
while (!found) {
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i]
        counter++
        for (let j = 0; j < current.length; j++) {
            current[j] =
                instruction === 'R' ? locations[current[j]]['right'] :
                instruction === 'L' ? locations[current[j]]['left'] :
                undefined
        }
        if (current.every(x => x[2] === 'Z')) {
            console.log(counter)
            found = true
            break
        }
    }
}