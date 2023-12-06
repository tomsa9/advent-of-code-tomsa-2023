const fs = require('fs');

const filePath = 'input1';
const numberRegex = /\d+/g
const input= fs.readFileSync(filePath).toString()

const results = [...input.matchAll(numberRegex)].map(x => parseInt(x['0'])).filter(x => !isNaN(x))
const [times, distances]  = [results.slice(0, results.length/2), results.slice(results.length/2, results.length)]

const races = []
times.forEach((_, i) => {
    races.push({time: times[i], distance: distances[i]})
})

let agg = undefined
races.forEach((race) => {
    let acc = 0
    for (let i = 0; i <= race['time']; i++) {
        const travelled = i * (race['time'] - i)
        if (travelled > race['distance']) acc++
    }
    console.log(acc)
    if (agg) agg *= acc
    else agg = acc
})

console.log(agg)