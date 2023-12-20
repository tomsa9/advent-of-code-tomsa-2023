const steps = require("./input").split(",");

const calculateHash = (step) => {
    return [...step].reduce((result,char) => {
        result += char.charCodeAt(0);
        result *= 17;
        return result % 256;
    },0);
};

const result = steps.reduce((sum,step) => sum + calculateHash(step),0);

console.log(result);

