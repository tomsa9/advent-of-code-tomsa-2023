const fs = require('fs');

const filePath = 'input2';
const input = fs.readFileSync(filePath).toString().split("\n")
let acc = 0

input.forEach((row, index) => {
    const colorMax = {
        'red': 0,
        'green': 0,
        'blue': 0
    }
    const cleanRow = row.substring(row.indexOf(':') + 1).trim()
    const internalRows = cleanRow.split(';').map((entry) => entry.split(',').map((entry) => entry.trim().split(' ')))
    internalRows.forEach((internalRow) => {
        internalRow.forEach((entry) => {
            if (parseInt(entry[0]) > colorMax[entry[1]]) {
                colorMax[entry[1]] = parseInt(entry[0])
            }
        })
    })
    acc += colorMax['red'] * colorMax['green'] * colorMax['blue']
})
console.log(acc)