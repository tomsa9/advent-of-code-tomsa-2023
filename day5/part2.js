const fs = require('fs');


// Not a good solution - I had to run it with split input in parallel and tried every result that came
// I can also run them with the original input and it will take 4-5 hours to run

const filePath = 'input2';
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
    // console.log(entry)
    maps.push(entry)
}

let min = Infinity

// const scan = (current, offset, remainingMaps) => {
//     let result = Infinity
//     const [currentMap, restOfMaps] = [remainingMaps[0], remainingMaps.slice(1)]
//     for (let i = current; i < current - offset; i++) {
//         let found = i
//         let foundMap = currentMap.filter(([dest, source, range]) => {
//             return i >= source && i <= source + range
//         })
//         if (foundMap) {
//             found = foundMap[0][0] + i - foundMap[0][1]
//         }
//         result = Math.min()
//         i = Math.min(i, found)
//     }
// }

for (let i = 0; i < seeds.length; i += 2) {
    const [seedStart, offset ] = [seeds[i], seeds[i + 1]]
    for (let j = 0; j < offset; j++) {
        const seed = seedStart + j
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
        // console.log(result)
        min = Math.min(min, result)
    }
    console.log(min)
}
console.log(min)