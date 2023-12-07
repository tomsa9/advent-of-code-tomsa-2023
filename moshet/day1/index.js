const input = require("./input")
const textToNumber = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

const getMatch = (row, isLast) => {
    const matches = Object.keys(textToNumber)
        .map(textNumber => ({textNumber, originalNum: textNumber, index: row[isLast ? "lastIndexOf" : "indexOf"](textNumber)}) )
        .filter(({index}) => index>-1)
        .sort((a,b) => a.index - b.index);
    return isLast ? matches[matches.length-1] : matches[0];
    // console.log({row, match})
}

const replaceMatch = (row, match) => {
    return match ? row.substring(0, match.index)+textToNumber[match.originalNum]+row.substring(match.index+match.textNumber.length) : row
}

const result = input.split("\n").reduce((total, row) => {
    const debug = row==="lkvtwone1zpkjnbjtjrqppqsksdz";
    debug && console.log(row);
    //return match ? row.substring(0, match.index)+textToNumber[match.textNumber]+row.substring(match.index+match.textNumber.length) : row;
    let firstMatch = getMatch(row);
    let lastMatch = getMatch(row, true);
    row = replaceMatch(row, firstMatch);
    if(firstMatch && lastMatch && lastMatch.index!==firstMatch.index) {
        if( (firstMatch.index + firstMatch.textNumber.length) > lastMatch.index ) {
            lastMatch.textNumber = lastMatch.textNumber.substring( (firstMatch.index + firstMatch.textNumber.length) - lastMatch.index )
            lastMatch.index = firstMatch.index + 1;
        }
        else {
            lastMatch.index = lastMatch.index - firstMatch.textNumber.length + 1
        }
        debug && console.log({row,firstMatch,lastMatch});
        row = replaceMatch(row, lastMatch);
    }

    let firstNumber = "";
    let lastNumber = "";
    for(let i=0; i<row.length; i++) {
        if(Number(row[i])==row[i]) {
            if(firstNumber==="") {
                firstNumber = row[i];
            }
            lastNumber = row[i];
        }
    }
    const number = Number(firstNumber+""+lastNumber);
    debug && console.log(number+"="+row)
    // console.log(number)
    return total+number
},0)
console.log(result)