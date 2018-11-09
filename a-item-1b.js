
const aircraftNamespace = "org.acme.airline.aircraft";
const aircraftType = "Aircraft";
let aircraftFQNS = aircraftNamespace + "." + aircraftType;

const namespace = "org.acme.airline.flight";
const flightType = "Flight";
let flightFQNS = namespace + "." + flightType;
const networkId = "admin@airlinev8";
const bnUtil = require('./a-bn-connection-util');

function removeAll() {
    bnUtil.connect(removeAircraftsFlights, networkId);
}

function removeAircraftsFlights(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    return removeResources("Flight", flightFQNS).then(()=> {
        return removeResources("Aircraft", aircraftFQNS);
    }).then(()=>{
        console.log("Removed all aircrafts and flights.");
    }).catch((error)=>{
        console.log(error);
    });
}

function removeResources(resourceName, resourceFQN){
    var registry = {}

    return bnUtil.connection.getAssetRegistry(resourceFQN).then((reg)=>{
        registry = reg;
        console.log('Received ' + resourceName + ': ', registry.id);
        return registry.getAll();
    }).then((flights)=>{
        console.log('Retrieved ' + resourceName + ' : ', flights.length);
        return registry.removeAll(flights)
    }).then(()=>{
        console.log('Removed all ' + resourceName + ' !!');
    }).catch((error)=>{
        console.log(error);
    });
}

module.exports.removeAll = removeAll;
