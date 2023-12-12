const input = require("./input");
let games = input.split("\n").map(row => {
    const game = row.split(":");
    const gameNum = Number( game[0].replace("Game","").trim() );
    const maxNums = game[1].split(";").reduce((result, currentSet) => {
        const set = currentSet.split(",").map(coloredCubes => {
            const [num, color] = coloredCubes.trim().split(" ");
            return {num: Number(num), color};
        });
        for(let {color, num} of set) {
            if(result[color] < num) {
                result[color] = num;
            }
        }
        return result;
    },{red: 0, green: 0, blue: 0});
    const power = Object.values(maxNums).reduce((result, num) => result*num,1);
    return {gameNum, maxNums, power};
});
console.log(games);
// const LIMITS = {
//     "red" : 12,
//     "green" : 13,
//     "blue": 14
// };
// games = games.filter(({maxNums}) => {
//    for(let [color, num] of Object.entries(maxNums)) {
//        if( num > LIMITS[color]) {
//            return false;
//        }
//    }
//    return true;
// });
// console.log(games);
// const result = games.reduce((sum, {gameNum}) => sum + gameNum,0);
const result = games.reduce((sum, {power}) => sum + power,0);
console.log(result);