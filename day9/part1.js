const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split('\n').map(x => x.trim().split(' ').map(x => parseInt(x)))

const ends = []

input.forEach(row => {
    let found = false
    const arrays = [row]
    while (!found) {
        let current = arrays[arrays.length - 1]
        const acc = []
        for (let i = 0; i < current.length - 1; i++) {
            acc.push(current[i + 1] - current[i])
        }
        arrays.push(acc)
        if (acc.every(x => x === 0)) {
            found = true
        }
    }
    let prev = 0
    for (let i = arrays.length - 1; i >= 0; i--) {
        prev = arrays[i][arrays[i].length - 1] + prev
    }
    ends.push(prev)
})
console.log(ends.reduce((acc, x) => acc + x, 0))
