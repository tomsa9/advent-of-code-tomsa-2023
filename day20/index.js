const input = require("./input");
// const input = require("./examples/1");
let conjunctions = [];
const modules = input.split("\n").reduce((map,row) => {
    let [match, type, key, connections] = row.match(/([%&])?([a-z]+) -> ([a-z, ]+)/);
    map[key] = {type, connections: connections.split(", ")};
    if(type==='%')
        map[key].isOn = false;
    else if(type==='&') {
        map[key].memory = {};
        conjunctions.push(key);
    }
    return map
},{});

for(let [key,{connections}] of Object.entries(modules)) {
    for(let connection of connections) {
        if(conjunctions.includes(connection)) {
            modules[connection].memory[key] = "low";
        }
    }
}

console.log(modules);

let numPulses = {high:0, low:0};

const sendPulse = (pulse, from, to) => {
    numPulses[pulse]++;

    let nextPulse = {pulse, from: to, connections: []};
    const target = modules[to];
    if(target) {
        // const {type, connections, isOn, memory} = modules[to];
        switch(target.type) {
            case "%": {
                if(pulse==="low") {
                    nextPulse.pulse = target.isOn ? "low" : "high";
                    target.isOn = !target.isOn;
                    nextPulse.connections = target.connections;
                }
            }
                break;
            case "&": {
                target.memory[from] = pulse;
                nextPulse.pulse = Object.values(target.memory).filter(lastPulse => lastPulse==="low").length===0 ? "low" : "high";
                nextPulse.connections = target.connections;
            }
                break;
        }
    }

    return nextPulse;
};

const pushButton = () => {
    const {connections} = modules["broadcaster"];
    let nexPulses = [
        {from: "broadcaster", pulse: "low", connections}
    ];
    numPulses.low++;
    while(nexPulses.length) {
        const nextPulse = nexPulses.shift();
        for(let key of nextPulse.connections){
            nexPulses.push( sendPulse(nextPulse.pulse, nextPulse.from, key) );
        }
    }
};

for(let i=0; i<1000; i++) {
    pushButton();
    console.log(numPulses);
}

console.log(numPulses.high*numPulses.low);