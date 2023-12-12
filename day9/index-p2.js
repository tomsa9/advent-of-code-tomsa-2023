const input = require("./input");
let history = input.split("\n")
    .map(row => row.split(" ").map(num => Number(num)));

const predictPrevValue = (row) => {
    let state = [row];
    let r = 0;
    while(state[r].filter(num => num!==0).length) {
        let nextRow = [];
        for(let i= 0; i<state[r].length-1; i++) {
            nextRow[i] = state[r][i+1] - state[r][i];
        }
        state.push(nextRow);
        r++;
    }
    // console.log(state);
    while (r>=0) {
        const prevVal = (r===state.length-1) ? 0 : (state[r][0] - state[r+1][0]);
        state[r].unshift(prevVal);
        r--;
    }
    // console.log(state);
    // process.exit(0);
    const prediction =  state[0][0];
    console.log(prediction);
    return prediction;
};

const result = history.reduce((result, row) => result + predictPrevValue(row), 0);

console.log({result});