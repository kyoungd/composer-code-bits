const aircraftNamespace = "org.acme.airline.aircraft";
const aircraftType = "Aircraft";
const bnUtil = require('./a-bn-connection-util');

let fullyQualifiedNS = aircraftNamespace + "." + aircraftType;
bnUtil.connect(main, "admin@airlinev8");

function main(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }

    bnUtil.connection.getAssetRegistry(fullyQualifiedNS)
    .then((registry)=> {
        console.log('1. Received Registry: ', registry.id);
        addAircraft(registry);
    }).catch((error)=> {
        console.log(error);
    })
}

function addAircraft(registry) {
    let aircrafts = [];
    const bnDef = bnUtil.connection.getBusinessNetwork();
    const factory = bnDef.getFactory();

    let aircraftResource1 = factory.newResource(aircraftNamespace, aircraftType, "CRAFT01");
    aircraftResource1.setPropertyValue('ownershipType', 'LEASED');
    aircraftResource1.setPropertyValue('firstClassSeats', 10);
    aircraftResource1.setPropertyValue('businessClassSeats', 20);
    aircraftResource1.setPropertyValue('economyClassSeats', 200);
    aircrafts.push(aircraftResource1);

    let aircraftResource2 = factory.newResource(aircraftNamespace, aircraftType, "CRAFT02");
    aircraftResource2.setPropertyValue('ownershipType', 'LEASED');
    aircraftResource2.setPropertyValue('firstClassSeats', 20);
    aircraftResource2.setPropertyValue('businessClassSeats', 20);
    aircraftResource2.setPropertyValue('economyClassSeats', 50);
    aircrafts.push(aircraftResource2);

    return registry.addAll(aircrafts).then(()=>{
        console.log('Added the Resources successfully!!!');
        bnUtil.disconnect();
    }).catch((error)=> {
        console.log(error);
        bnUtil.disconnect();
    })
}
