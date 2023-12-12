const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString()

const seeds = input.split("\n")[0].substring(input[0].indexOf(':') + 1).trim().split(' ').map(x => parseInt(x)).filter(x => !isNaN(x))

const maps = []
const splitInput = input.split(':')
for (let i = 2; i < splitInput.length; i++) {
    let entry = splitInput[i].trim().split('\n').map(x => x.trim().split(' '))
    if (i < splitInput.length - 1) {
        entry.pop()
        entry.pop()
    }
    for (let j = 0; j < entry.length; j++) { entry[j] = entry[j].map(x => parseInt(x)) }
    console.log(entry)
    maps.push(entry)
}

let min = Infinity
seeds.forEach(seed => {
    let result = seed
    maps.forEach(map => {
        let found = false
        map.forEach(([dest, source, range]) => {
            if (!found && result >= source && result <= source + range) {
                result = dest + result - source
                found = true
            }
        }
    )
    })
    console.log(result)
    min = Math.min(min, result)
})
console.log(min)