const _ = require("lodash-transpose");
const patterns = require("./input").split("\n\n").map(
    pattern => pattern.split("\n").map(row => [...row])
);

const validateReflection = (rows,reflectionIndex) => {
    for(let i= 1; (reflectionIndex-i-1)>=0 && (reflectionIndex+i)<rows.length; i++) {
        const aboveRow = rows[reflectionIndex-i-1].join('');
        const belowRow = rows[reflectionIndex+i].join('');
        if(aboveRow!==belowRow)
            return false;
    }
    return true;
}

const getRowAboveReflection = rows => {
    let lastRow = "";
    for(let i= 0; i<rows.length; i++) {
        const row = rows[i].join('');
        if(row===lastRow && validateReflection(rows, i)) {
            return i;
        }
        lastRow = row;
    }
    return 0;
}

const result = patterns.reduce((result, pattern) => {
    const rowsReflections = getRowAboveReflection(pattern);
    const colsReflections = getRowAboveReflection(_.transpose(pattern));
    return result + (100*rowsReflections) + colsReflections;
},0);

console.log(result);

