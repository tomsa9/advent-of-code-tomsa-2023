const input = require("./input");

let universe = input.split("\n").map(row => [...row]);

const printUniverse = () => {
    console.log( universe.map(row => row.join('')).join("\n") );
    console.log(universe.length+"X"+universe[0].length);
}
printUniverse();

for(let r= 0; r<universe.length; r++) {
    const foundGalaxies = universe[r].filter(cell => cell==="#");
    if( !foundGalaxies.length ) {
        universe = [...universe.slice(0,r),universe[r],...universe.slice(r)];
        r++;
    }
}
for(let c= 0; c<universe[0].length; c++) {
    let foundGalaxies = 0;
    for(let r= 0; r<universe.length; r++) {
        if(universe[r][c]==="#")
            foundGalaxies++;
    }
    if( !foundGalaxies ) {
        for(let r= 0; r<universe.length; r++) {
            universe[r] = [...universe[r].slice(0, c), universe[r][c], ...universe[r].slice(c)];
        }
        c++;
    }
}

printUniverse();

const galaxies = universe.reduce((result, row, r) => {
    return row.reduce((result, cell, c) => {
        if(cell==="#") {
            const galaxyNum = result.length;
            universe[r][c] = galaxyNum;
            result.push({r,c});
        }
        return result;
    }, result);
},[]);

printUniverse();
// console.log(galaxies);

const distancesSum = galaxies.reduce((sum, galaxy, index) => {
    for(let o = index+1; o<galaxies.length; o++) {
        const distance =  Math.abs(galaxies[o].r - galaxy.r) + Math.abs(galaxies[o].c - galaxy.c);
        console.log(galaxy,galaxies[o],distance);
        sum += distance;
    }
    return sum;
},0);

console.log(distancesSum);