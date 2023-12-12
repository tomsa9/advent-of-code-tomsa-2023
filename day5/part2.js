const fs = require('fs');
const Parallel = require('paralleljs');


// Not a good solution - I had to run it with split input in parallel and tried every result that came
// I can also run them with the original input and it will take 4-5 hours to run
const start = performance.now();

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

let seedTuples = []
for (let i = 0; i < seeds.length; i += 2) {
    seedTuples.push([seeds[i], seeds[i + 1], maps, start])
}

const job = new Parallel(seedTuples)
job.map(([seedStart, offset, maps, start]) => {
    let min = Infinity
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
    console.log("Found result of seed " + seedStart + " to be " + min)
    return [min, start]
}).then((data) => {
    const result = data.map(x => parseInt(x[0]))
    console.log("Best result is:" + Math.min(...result))
    const start = Math.max(...data.map(x => parseInt(x[1])))
    const end = performance.now();
    console.log(`Execution time: ${end - start} ms`);
})