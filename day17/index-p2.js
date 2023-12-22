const Graph = require('node-dijkstra')

const grid = require("./input").split("\n").map(row => [...row]);

let graph = {};

const key = (allowDir,r,c) => ( ((r===0 && c===0) || (r===grid.length-1 && c===grid[0].length-1)) ? '' : allowDir)+"R"+r+"C"+c;

const setPath = (from,to,cost) => {
    if(!graph[from])
        graph[from] = {};
    graph[from][to] = cost;
}

const populateNode = (r,c) => {
    const node = key(r,c);
    graph[node] = {};
    for(let i=r+1, cost=0; i<=r+10 && i<grid.length; i++) {
        cost += Number(grid[i][c]);
        if(i>=r+4)
            setPath( key("V", r, c), key("H",i,c), cost );
    }
    for(let i=r-1, cost=0; i>=r-10 && i>=0; i--) {
        cost += Number(grid[i][c]);
        if(i<=r-4)
            setPath( key("V", r, c), key("H",i,c), cost );
    }
    for(let i=c+1, cost=0; i<=c+10 && i<grid[0].length; i++) {
        cost += Number(grid[r][i]);
        if(i>=c+4)
            setPath( key("H", r, c), key("V",r,i), cost );
    }
    for(let i=c-1, cost=0; i>=c-10 && i>=0; i--) {
        cost += Number(grid[r][i]);
        if(i<=c-4)
            setPath( key("H", r, c), key("V",r,i), cost );
    }
};

for(let r = 0; r<grid.length; r++) {
    for(let c = 0;c<grid[r].length; c++) {
        populateNode(r,c);
    }
}

// console.log(graph);
console.log(Object.keys(graph).length);

const route = new Graph(graph);

const result = route.path( key("",0,0), key("",grid.length-1, grid[0].length-1), {cost: true});

console.log(result);

/*
r1c1
r1c1->Vr1c2
r1c1->Vr1c3
r1c1->Vr1c4
Vr1c2->Hr2c2
Vr1c2->Hr3c2
Vr1c2->Hr4c2
Hr2c2->Vr2c1
Hr2c2->Vr2c3
Hr2c2->Vr2c4
Hr2c2->Vr2c5
 */