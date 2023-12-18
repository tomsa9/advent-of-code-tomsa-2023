const _ = require("lodash-transpose");
const patterns = require("./input").split("\n\n").map(
    pattern => pattern.split("\n").map(row => [...row])
);

const checkIsEqualWithSmudge = (row1, row2, smudgeUsed) => {
    const num_diffs = [...row1].reduce((diffs, char, i) => diffs + (char===row2[i] ? 0 : 1),0);
    return ((!smudgeUsed && num_diffs === 1) || num_diffs===0) && {smudgeUsed: num_diffs===1 || smudgeUsed};
};

const validateReflection = (rows, reflectionIndex, smudgeUsed) => {
    for(let i= 1; (reflectionIndex-i-1)>=0 && (reflectionIndex+i)<rows.length; i++) {
        const aboveRow = rows[reflectionIndex-i-1].join('');
        const belowRow = rows[reflectionIndex+i].join('');
        const isEqualWithSmudge = checkIsEqualWithSmudge(aboveRow, belowRow, smudgeUsed);
        if( !isEqualWithSmudge )
            return false;
        smudgeUsed = isEqualWithSmudge.smudgeUsed;
    }
    return {smudgeUsed};
}

const getRowAboveReflection = rows => {
    let lastRow = "";
    let smudgeUsed = false;
    for(let i= 0; i<rows.length; i++) {
        const row = rows[i].join('');
        const isEqualWithSmudge = checkIsEqualWithSmudge(row, lastRow, false);
        if( isEqualWithSmudge ) {
            smudgeUsed = isEqualWithSmudge.smudgeUsed || smudgeUsed;
            const isValid = validateReflection(rows, i, smudgeUsed);
            if( isValid && isValid.smudgeUsed) {
                return i;
            }
            smudgeUsed = false;
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

