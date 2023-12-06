const fs = require('fs');

const filePath = 'input1';
const numberRegex = /\d+/g
const input= fs.readFileSync(filePath).toString().split('\n').map(x => x.substring(x.indexOf(':') + 1))

const race = parseInt(input[0].replaceAll(' ', ''))
const distance = parseInt(input[1].replaceAll(' ', ''))

let acc = 0
for (let i = 0; i <= race; i++) {
    const travelled = i * (race - i)
    if (travelled > distance) acc++
}

console.log(acc)