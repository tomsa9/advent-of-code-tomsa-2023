const input = require("./input");

const matrix = input.split("\n").map(row => [...row]);
let result = 0;
let gears = {};
for(let r= 0; r < matrix.length; r++) {
    let numbers = [];
    for(let c = 0; c < matrix[r].length; c++) {
        const val = matrix[r][c];
        if(val==Number(val)) {
            if(!numbers.length || numbers[numbers.length-1].end < (c-1)) {
                numbers.push({start : c, end: c, val});
            }
            else {
                numbers[numbers.length-1].end = c;
                numbers[numbers.length-1].val += val;
            }
        }
    }
    console.log({row: matrix[r], numbers});
    gears[r] = numbers;
    // for(let {start, end, val} of numbers) {
    //     let isValid = false;
    //     for(let ir= Math.max(0,r-1); ir <= Math.min(matrix.length-1, r+1); ir++) {
    //         for(let ic = Math.max(0,start-1); ic <= Math.min(matrix[ir].length-1, end+1); ic++) {
    //             const val = matrix[ir][ic];
    //             if(val !=="." && val!=Number(val)) {
    //                 isValid = true;
    //             }
    //         }
    //     }
    //     if( isValid ) {
    //         console.log(val);
    //         result += Number(val);
    //     }
    // }
}

for(let r= 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
        const val = matrix[r][c];
        if (val === "*") {
            let matches = [];
            for(let ir= Math.max(0,r-1); ir <= Math.min(matrix.length-1, r+1); ir++) {
                if (!gears[ir])
                    continue;
                const newMatches = gears[ir].filter(({start, end}) => {
                    if(ir===r && (start===c+1 || end===c-1))
                        return true;
                    else if (start >= c-1 && start <= c+1)
                        return true;
                    else if ( end >= c-1 && end <= c+1)
                        return true;
                    else if ( start <= c-1 && end >= c+1 )
                        return true;
                    return false;
                });
                matches = [...matches, ...newMatches];
            }
            console.log({matches});
            if(matches.length===2) {
                result += (matches[0].val * matches[1].val);
            }
        }
    }
}
console.log(result);