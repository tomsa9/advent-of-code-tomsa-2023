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

ratings = ratings.split("\n").map(row => {
    const [match, x,m,a,s] = row.match(/\{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)\}/);
    return { x:Number(x), m:Number(m), a:Number(a), s:Number(s) };
});

console.log(ratings);

const getResult = (key, rating) => {
    const conditions = workflows[key];
    let result = "";
    for(let condition of conditions) {
        if(!condition.criteria) {
            result = condition.result;
            break;
        }
        else {
            const score = rating[condition.letter];
            const conditionResult = condition.criteria===">" ? (score > condition.comparedTo) : (score < condition.comparedTo);
            if(conditionResult) {
                result = condition.result;
                break;
            }
        }
    }
    return (result!=="A" && result!=="R") ? getResult(result, rating) : result;
};

const acceptedSum = ratings.reduce((sum, rating) => {
    const result = getResult("in", rating);
    return sum + (result==="A" ? Object.values(rating).reduce((sumScores,score) => sumScores+score,0) : 0);
},0);
console.log(acceptedSum);