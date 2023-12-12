const fs = require("fs");

const input = fs.readFileSync("input2").toString()
const _ = require("lodash");

const rows = input.split("\n");
// let seeds = rows.splice(0,1)[0].split(" ").slice(1).map(num => Number(num));
let seeds = rows.splice(0,1)[0].split(" ").slice(1).map(num => Number(num))
    .reduce((result, num) => {
        if(!result[0] || result[result.length-1].range) {
            result.push({start: num});
        }
        else {
            result[result.length-1].range = num;
            result[result.length-1].end = result[result.length-1].start + result[result.length-1].range-1;
        }
        return result;
    },[]);
console.log(seeds);
let maps = {};
let currentMap = "";
for(let row of rows) {
    if(row === "") {
        currentMap = "";
    }
    else if( row.indexOf("map")>-1 ) {
        currentMap = row.replace(" map:","");
        maps[currentMap] = [];
    }
    else {
        const [dest, src, length] = row.split(" ");
        maps[currentMap].push( {dest: Number(dest), src: Number(src), length: Number(length)} );
    }
}

const traverseMaps = ({start, end}, srcCat, destCat) => {
    const mapKey = srcCat+"-to-"+destCat //seed-to-soil
    // let foundRanges = [{start, end}];
    let foundRanges = [];
    for(let {dest, src, length} of maps[mapKey]) {
        if( (start>=src && start<=(src+length)) || (end>=src && end<=(src+length)) || (start<src && end>(src+length)) ) {
            let rangeStart = (start>=src && start<=(src+length)) ? start : src;
            let rangeEnd = (end>=src && end<=(src+length)) ? end : (src+length);
            foundRanges.push({srcStart: rangeStart, srcEnd: rangeEnd, start: dest + (rangeStart-src), end: dest + (rangeEnd-src)});
        }
    }
    console.log(foundRanges);
    foundRanges = foundRanges.sort((a,b) => a.srcStart - b.srcStart).reduce((result, foundRange, i) => {
        const {srcStart, srcEnd} = foundRange;
        if(i===0 && srcStart>start) {
            result.push({start, end: srcStart-1});
        }
        result.push({start: foundRange.start, end: foundRange.end});
        if( foundRanges[i+1] && foundRanges[i+1].srcStart > srcEnd) {
            result.push({start: srcEnd+1, end: foundRanges[i+1].srcStart-1});
        }
        if( !foundRanges[i+1] && srcEnd < end ) {
            result.push({start: srcEnd+1, end});
        }
        return result;
    },[]);
    console.log({start, end, foundRanges});
    // process.exit(0);
    let results = [];
    for(let range of foundRanges) {
        const deepResult = Object.keys(maps)
            .filter(key => key.indexOf(destCat+"-to-")>-1)
            .map(key => traverseMaps(range, destCat, key.replace(destCat+"-to-","")))[0];
        if(deepResult) {
            results = [...results, ...deepResult];
        }
    }
    return results.length ? results : foundRanges;
}

const seed_locations = seeds.map(seed => traverseMaps(seed,"seed","soil") );
console.log(seed_locations);
console.log(_.flatten(seed_locations).sort((a,b) => a.start-b.start)[0]);