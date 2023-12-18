const _ = require("lodash");
const input = require("./input");
// const input = "..???.??.? 1,1,1";
const arrangements = input.split("\n").map(row => {
    let [sequence, groups] = row.split(" ");
    groups = groups.split(",").map(num => Number(num));
    return {sequence,groups};
});

console.log(arrangements);

const start = Date.now();

const spawnBranches = (sequence, groups) => {
    let branches = [];
    let foundUnknown = false;
    for(let c = 0; c<sequence.length; c++) {
        if(sequence[c]==="?") {
            ["#","."].map(char => {
                branches = [...branches, ...spawnBranches(sequence.slice(0,c)+char+sequence.slice(c+1), groups )];
            });
            foundUnknown = true;
            break;
        }
    }
    if(!foundUnknown && validateBranch(sequence, groups)) {
        branches = [sequence];
    }
    return branches;
}

const spawnBranchesMem = _.memoize(spawnBranches, (sequence, groups) => {
    const key = sequence+groups.join(",");
    console.log('memoized='+key);
    return key;
})

const validateBranch = (branchSeq, groups) => {
    let c = 0;
    for(let group of groups) {
        let numFound = 0
        while(numFound<=group && c<branchSeq.length) {
            if(branchSeq[c]==="#") {
                if(numFound===group)
                    return false;
                numFound++;
            }
            else if(branchSeq[c]===".") {
                if(numFound===group)
                    break;
                else if(numFound)
                    return false;
            }
            c++;
        }

        if(numFound<group)
            return false;
    }
    return c===branchSeq.length-1 || !branchSeq.slice(c+1).includes("#");
};

const checkGroup = _.memoize(
    (sequence, groups, gi = 0, numFound = 0, c =0, lastChar =".", char = sequence[c] || false) => {
    const group = groups[gi];
    switch(char) {
        case "#":
            numFound++;
            break;
        case ".":
            if(lastChar==="#" && numFound===group) {
                const result = checkGroup(sequence, groups, gi+1, 0, c+1, char);
                return result;
            }
            else if(numFound) {
                return 0;
            }
            break;
        case false:
            if((lastChar==="#" && numFound===group && gi===groups.length-1) || (!numFound && !group)) {
                return 1;
            }
            return 0;
        case "?":
            const sum =  checkGroup(sequence, groups, gi, numFound, c, lastChar, "#") + checkGroup(sequence, groups, gi, numFound, c, lastChar, ".");
            return sum;
    }
    if(numFound>group) {
        return 0;
    }
    const returned =  checkGroup(sequence, groups, gi, numFound, c+1, char);
    return returned;
}, (...args) => JSON.stringify(args));

const getNumPossibleBranches = (sequence, groups) => {
    return checkGroup(sequence, groups);
};

(async () => {
    let arrangements_possibilities = 0;
    for(let {sequence, groups} of arrangements) {
        console.log(sequence, groups);
        // let default_num_possible = getNumPossibleBranches(sequence, groups);
        // console.log(default_num_possible);
        let num_possible_factor_5 = getNumPossibleBranches(
            Array(5).fill(sequence).join("?"),
            _.flatten( Array(5).fill(groups) )
        );
        console.log(num_possible_factor_5);
        // const num_possible = Math.floor(Math.pow(num_possible_factor_2,4) / Math.pow(default_num_possible, 3) );
        // console.log(num_possible);
        // await ((() => new Promise((resolve) => setTimeout(() => {resolve()}, 10)))() );
        // process.exit(0);
        // result = [...result, ...possible_branches];
        // arrangements_possibilities += num_possible;
        arrangements_possibilities += num_possible_factor_5;
    }

    console.log(arrangements_possibilities, (Date.now()-start)+'ms' +
        '');
    process.exit(0);
})();