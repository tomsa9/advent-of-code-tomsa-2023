const input = require("./input");
let history = input.split("\n")
    .map(row => row.split(" ").map(num => Number(num)));

const predictNextValue = (row) => {
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
        const nextVal = (r===state.length-1) ? 0 : (state[r].slice(-1)[0] + state[r+1].slice(-1)[0]);
        state[r].push(nextVal);
        r--;
    }
    // console.log(state);
    const prediction =  state[0].slice(-1)[0];
    console.log(prediction);
    return prediction;
};

const result = history.reduce((result, row) => result + predictNextValue(row), 0);

console.log({result});