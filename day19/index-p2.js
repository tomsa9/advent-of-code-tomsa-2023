const input = require("./input");
let [workflows, ratings] = input.split("\n\n");

workflows = workflows.split("\n").reduce((result,workflow) => {
    let [match, key, conditions] = workflow.match(/([a-z]+)\{([^}]+)\}/);
    // console.log(match, key, conditions);
    conditions = conditions.split(",").map(condition => {
        condition = condition.split(":");
        if(condition.length===1)
            return {result: condition[0]};
        else {
            const pattern = /([xmas])([><])([0-9]+)/;
            const [match, letter, criteria, comparedTo] = condition[0].match(pattern);
            return {letter, criteria, comparedTo: Number(comparedTo), result: condition[1]};
        }
    });
    result[key] = conditions;
    return result;
}, {});

console.log(workflows);

const getResult = (key, ranges) => {
    if(key==="A")
        return [ ranges ];
    else if(key==="R")
        return [];

    const conditions = workflows[key];
    // console.log(conditions);
    let combinations = [];
    for(let condition of conditions) {
        if(!condition.criteria) {
            combinations = [...combinations, ...getResult( condition.result, ranges)];
            break;
        }
        else {
            const scoreRange = ranges[condition.letter];
            // console.log(scoreRange);
            let tryRanges = [];
            if(condition.criteria===">") {
                tryRanges.push( [ Math.max(scoreRange[0], condition.comparedTo+1), scoreRange[1] ] );
                ranges[condition.letter] = [ scoreRange[0], tryRanges[0][0]-1 ];

            }
            else {
                tryRanges.push( [ scoreRange[0], Math.min(scoreRange[1], condition.comparedTo-1) ] );
                ranges[condition.letter] = [ tryRanges[0][1]+1, scoreRange[1] ];
            }
            tryRanges.filter(range => range[1]>=range[0]).map(range => {
                combinations = [...combinations, ...getResult( condition.result, {...ranges, [condition.letter]: range})];
            });
        }
    }

    return combinations;
};

const combination_ranges = getResult("in", {x:[1,4000], m:[1,4000], a:[1,4000], s:[1,4000]});
let distinct_combination_ranges = combination_ranges.reduce((result, combination) => {
    const key = Object.values(combination).map(range => range.join("_")).join(",");
    result[key] = combination;
    return result;
},{});
console.log(Object.values(distinct_combination_ranges));
distinct_combination_ranges = Object.entries(distinct_combination_ranges).reduce((result, [key,combination]) => {
    let isRangeFound = false;
    for(let [oKey,oCombination] of Object.entries(distinct_combination_ranges)) {
        if( key!==oKey ) {
            const lettersFound = Object.keys(combination).reduce((found,letter) => {
                if(combination[letter][0]>=oCombination[letter][0] && combination[letter][1]<=oCombination[letter][1]) {
                    found.push(letter);
                }
                return found;
            }, []);
            if(lettersFound.length===Object.keys(combination).length) {
                isRangeFound = true;
                break;
            }
        }
    }
    if(!isRangeFound) {
        result[key] = combination;
    }
    return result;
},{});
// console.log(combination_ranges);
console.log(Object.values(distinct_combination_ranges));

const result = Object.values(distinct_combination_ranges).reduce((sum,ranges) => {
    const combinations = Object.values(ranges).reduce((result,[start,end]) => result*(end-start+1),1);
    return sum + combinations;
},0);
console.log(result);
//167409079868000
//646272000000000