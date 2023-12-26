const math = require("mathjs");
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
let i =0;

let numPulses = {high:0, low:0};
let isButtonEnabled = true;
let lcm_nodes = [];
const sendPulse = (pulse, from, to) => {
    numPulses[pulse]++;
//ms -> ks, zt -> xc, xd -> kp, gt -> ct //we need sources to send low so ms -low> ks -high> bb -low>
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

                if(["ms","zt","xd","gt"].includes(to) && Object.values(target.memory).filter(pulse => pulse==="low").length===0) {
                    console.log(to,i);
                    lcm_nodes.push([to,i]);
                }
            }
                break;
        }
    }
    else if (to==="rx") {
        if(pulse==="low") {
            isButtonEnabled = false;
        }
        // console.log(to,pulse);
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

while(isButtonEnabled && lcm_nodes.length<4) {
    i++;
    pushButton();
    // console.log(i);
}
console.log(lcm_nodes);
console.log(math.lcm(...lcm_nodes.map(node => node[1])));