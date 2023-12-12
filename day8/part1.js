const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split('\n')
const regex = /[A-Z][A-Z][A-Z]/g

const locations = {}
const instructions = input[0].trim().split('')
let current = 'AAA'
input.slice(2).forEach(x => {
    if (x === '') return
    const row = x.match(regex)
    locations[row[0]] = {left: row[1], right: row[2]}
})
console.log(locations)

let found = false
let counter = 0
while (!found) {
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i]
        const prev = current
        counter++
        current =
            instruction === 'R' ? locations[current]['right'] :
            instruction === 'L' ? locations[current]['left'] :
                    undefined
        console.log(prev + ' + ' + instruction + ' = ' + current)
        if (current === 'ZZZ') {
            found = true
            break
        }
    }
}

console.log(counter)