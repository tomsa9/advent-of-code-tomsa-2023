const fs = require('fs');

const filePath = 'input2';
const input= fs.readFileSync(filePath).toString().split("\n")
const regex = /[a-z]+/g

let acc = 0
input.forEach((row) => {
    const num = row.replaceAll('one', 'o1e').replaceAll('two', 't2o').replaceAll('three', 't3e').replaceAll('four', 'f4r').replaceAll('five', 'f5e').replaceAll('six', 's6x').replaceAll('seven', 's7n').replaceAll('eight', 'e8t').replaceAll('nine', 'n9e').replaceAll('zero', 'z0o')
    const regexedNum = num.replaceAll(regex, '')
    acc += parseInt(regexedNum[0] + regexedNum[regexedNum.length - 1])
})
console.log(acc)