const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split("\n")
const rules = {
    'red': 12,
    'green': 13,
    'blue': 14
}
let acc = 0
input.forEach((row, index) => {
    let allowed = true
    const cleanRow = row.substring(row.indexOf(':') + 1).trim()
    const internalRows = cleanRow.split(';').map((entry) => entry.split(',').map((entry) => entry.trim().split(' ')))
    internalRows.forEach((internalRow) => {
        internalRow.forEach((entry) => {
            if (parseInt(entry[0]) > rules[entry[1]]) {
                allowed = false
            }
        })
    })
    if (allowed) acc += index + 1
})
console.log(acc)