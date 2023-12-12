const input = require("./input");

let universe = input.split("\n").map(row => [...row].map(cell => ({symbol: cell, num_rows: 1, num_cols: 1})));

for(let r= 0; r<universe.length; r++) {
    const foundGalaxies = universe[r].filter(({symbol}) => symbol==="#");
    if( !foundGalaxies.length ) {
        universe[r] = universe[r].map(cell => ({...cell, num_rows: 1000000}));
    }
}
for(let c= 0; c<universe[0].length; c++) {
    let foundGalaxies = 0;
    for(let r= 0; r<universe.length; r++) {
        if(universe[r][c].symbol==="#")
            foundGalaxies++;
    }
    if( !foundGalaxies ) {
        for(let r= 0; r<universe.length; r++) {
            universe[r][c] = {...universe[r][c], num_cols: 1000000};
        }
    }
}

console.log(universe);

const galaxies = universe.reduce((result, row, r) => {
    return row.reduce((result, cell, c) => {
        if(cell.symbol==="#") {
            const galaxyNum = result.length;
            universe[r][c] = {...universe[r][c], galaxyNum};
            result.push({r,c});
        }
        return result;
    }, result);
},[]);

// printUniverse();
console.log(galaxies);

const distancesSum = galaxies.reduce((sum, galaxy, index) => {
    for(let o = index+1; o<galaxies.length; o++) {
        let distance =  0;
        for(let r= Math.min(galaxy.r, galaxies[o].r); r<Math.max(galaxy.r, galaxies[o].r); r++) {
            distance += universe[r][galaxy.c].num_rows;
        }
        for(let c= Math.min(galaxy.c, galaxies[o].c); c<Math.max(galaxy.c, galaxies[o].c); c++) {
            distance += universe[galaxy.r][c].num_cols;
        }
        console.log(galaxy,galaxies[o],distance);
        sum += distance;
    }
    return sum;
},0);

console.log(distancesSum);