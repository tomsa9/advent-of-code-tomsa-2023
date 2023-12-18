const input = require("./input");
const arrangements = input.split("\n").map(row => {
    let [sequence, groups] = row.split(" ");
    groups = groups.split(",").map(num => Number(num));
    return {sequence,groups};
});

console.log(arrangements);

const spawnBranches = (sequence) => {
    let branches = [];
    let foundUnknown = false;
    for(let c = 0; c<sequence.length; c++) {
        if(sequence[c]==="?") {
            ["#","."].map(char => {
                branches = [...branches, ...spawnBranches(sequence.slice(0,c)+char+sequence.slice(c+1) )];
            });
            foundUnknown = true;
            break;
        }
    }
    if(!foundUnknown) {
        branches = [sequence];
    }
    return branches;
}

const arrangements_possibilities = arrangements.reduce((result, {sequence, groups}) => {
    const branches = spawnBranches(sequence);
    const possible_branches = branches.filter(branchSeq => {
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
    });

    const num_possible = possible_branches.length;
    console.log(num_possible);
    // result = [...result, ...possible_branches];
    return result + num_possible;
},0);

console.log(arrangements_possibilities);