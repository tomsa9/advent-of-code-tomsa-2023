const steps = require("./input").split(",");

const calculateHash = (str) => {
    return [...str].reduce((result,char) => {
        result += char.charCodeAt(0);
        result *= 17;
        return result % 256;
    },0);
};

let boxes = {};
for(let step of steps) {
    if(step.includes("=")) {
        const [label, length] = step.split("=");
        const box = calculateHash(label);
        if(!boxes[box]) {
            boxes[box] = [];
        }
        const foundIndex = boxes[box].findIndex(lens => lens[0]===label);
        boxes[box][foundIndex>-1 ? foundIndex : boxes[box].length] = [label, length];
    }
    else { //ends with "-"
        const label = step.slice(0, step.length-1);
        const box = calculateHash(label);
        if(!boxes[box])
            continue;
        const foundIndex = boxes[box].findIndex(lens => lens[0]===label);
        if(foundIndex>-1) {
            for(let i=foundIndex; i<boxes[box].length-1; i++) {
                boxes[box][i] = boxes[box][i+1];
            }
            boxes[box].pop();
        }
    }
}

console.log(boxes);

const result = Object.entries(boxes).reduce((sum,[boxNum, lenses]) => {
    boxNum = Number(boxNum);
    const boxSum = lenses.reduce((boxSum, [label, length], index) => {
        const power =  (boxNum+1) * (index+1) * length;
        return boxSum + power;
    },0);
    return sum + boxSum;
},0);

console.log(result);

