const input = require("./input");

const cards = "A, K, Q, T, 9, 8, 7, 6, 5, 4, 3, 2, J".split(",")
    .map(card => card.trim());

const tests = [
    ({cardsSortedMap}) => cardsSortedMap[0].num===5,
    ({cardsSortedMap}) => cardsSortedMap[0].num===4,
    ({cardsSortedMap}) => cardsSortedMap[0].num===3 && cardsSortedMap[1].num===2,
    ({cardsSortedMap}) => cardsSortedMap[0].num===3,
    ({cardsSortedMap}) => cardsSortedMap[0].num===2 && cardsSortedMap[1].num===2,
    ({cardsSortedMap}) => cardsSortedMap[0].num===2,
    () => true
];

const hands = input.split("\n").map(row => {
    const [hand, bid] = row.split(" ");
    const cardsMap = [...hand].reduce((cardsMap, card) => {
        if(!cardsMap[card])
            cardsMap[card] = 0;
        cardsMap[card]++;
        return cardsMap;
    },{});
    const numJokerCards = cardsMap["J"];
    if(numJokerCards) {
        delete cardsMap["J"];
    }
    let cardsSortedMap = Object.entries(cardsMap)
        .map(([card, num]) => ({card, num}))
        .sort((a,b) => b.num-a.num);
    if(numJokerCards) {
        cardsSortedMap[0] = cardsSortedMap[0] ? {...cardsSortedMap[0], num: cardsSortedMap[0].num + numJokerCards} : {card: "J", num: 5};
    }
    return {
        hand,
        bid: Number(bid),
        cardsSortedMap
    };
});
console.log(hands);
const handsSorter = (a,b) => {
    let [aScore, bScore] = [a,b].map(item => {
        return tests.reduce((result, test, index) => {

            if(result===-1 && test(item)) {
                return index;
            }
            return result;
        }, -1);
    });
    // console.log({a,aScore,b,bScore});
    if(aScore===bScore && a.hand !== b.hand) {
        for(let i= 0; i<a.hand.length; i++) {
            ([aScore, bScore] = [a,b].map(item => cards.indexOf(item.hand[i]) ));
            if( aScore!==bScore ) {
                break;
            }
        }
    }
    return aScore - bScore;
};

const sortedHands = hands.sort(handsSorter).reverse(); //reversed so that weakest is at index 0
console.log("sortedHands", sortedHands.slice(-50));
const result = sortedHands.reduce((sum, {bid}, i) => sum + ( bid*(i+1) ), 0);
console.log(result);
