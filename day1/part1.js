const fs = require('fs');

const filePath = 'input1';
const input= fs.readFileSync(filePath).toString().split("\n")
const regex = /[a-z]+/g

let acc = 0
input.forEach((row) => {
    const num = row.replaceAll(regex, '')
    acc += parseInt(num[0] + num[num.length - 1])
})
console.log(acc)