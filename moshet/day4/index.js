const input = require("./input");
const _ = require("lodash");

let result = 0;
const rows = input.split("\n");
const cards = rows.map((row, index) => {
    let [card, numbers] = row.split(":");
    let [winningNumbers, myNumbers] = numbers.trim().split("|")
        .map(batch => batch.split(" ").filter(num => num));
    let matches = _.intersection(winningNumbers, myNumbers);
    console.log(matches);
    if(matches.length) {
        // result += Math.pow(2, matches.length-1);
    }
    return {
        card: card.replace("Card ",""),
        numMatches: matches.length,
        copies: 1
    };
});
for(let i= 0; i<cards.length; i++) {
    for(let m = 1; m <= cards[i].numMatches && m<cards.length; m++) {
        cards[i+m].copies += cards[i].copies;
    }
    console.log(cards[i]);
    result += cards[i].copies;
}
console.log(result);