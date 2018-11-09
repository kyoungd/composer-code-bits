
const aircraftNamespace = "org.acme.airline.aircraft";
const aircraftType = "Aircraft";
let aircraftFQNS = aircraftNamespace + "." + aircraftType;

const namespace = "org.acme.airline.flight"
const transactionType = "CreateFlight"
const networkId = "admin@airlinev8";
const bnUtil = require('./a-bn-connection-util');

function createAll() {
    bnUtil.connect(createFlights, networkId);
}

function createFlights(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    create3Aircraft();
    create3Flights();
}

function create3Flights() {
    let bnDef = bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                        bnDef.getName(), "   ", bnDef.getVersion());
    let factory = bnDef.getFactory();
    return createAFlight(factory, 'AE101', 'EWR', 'ATL', new Date('2019-05-06T21:44Z'))
    .then(()=>{
        return createAFlight(factory, 'AE102', 'LAX', 'ATL', new Date('2019-05-07T21:44Z'))
    }).then(()=> {
        return createAFlight(factory, 'AE103', 'BUR', 'ATL', new Date('2019-05-08T21:44Z'))
    }).then(()=> {
        console.log("Transaction Submitted/Processed Successfully!!");        
    }).catch((error)=> {
        console.log(error);
    })
}

function createAFlight(factory, flightNumber, origin, destination, schedule) {
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    let flightId = "AE101-05-06-2019";
    let transaction = factory.newTransaction(namespace, transactionType, flightId, options);
    transaction.setPropertyValue('flightNumber', flightNumber);
    transaction.setPropertyValue('origin', origin);
    transaction.setPropertyValue('destination', destination);
    transaction.setPropertyValue('schedule', schedule);
    return bnUtil.connection.submitTransaction(transaction).then(()=> {
        console.log("6. Transaction Submitted/Processed Successfully!!");
    }).catch((error)=> {
        console.log(error);
    });
}

function create3Aircraft() {
    bnUtil.connection.getAssetRegistry(aircraftFQNS)
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

    let aircraftResource3 = factory.newResource(aircraftNamespace, aircraftType, "CRAFT03");
    aircraftResource3.setPropertyValue('ownershipType', 'OWNED');
    aircraftResource3.setPropertyValue('firstClassSeats', 4);
    aircraftResource3.setPropertyValue('businessClassSeats', 6);
    aircraftResource3.setPropertyValue('economyClassSeats', 30);
    aircrafts.push(aircraftResource3);

    return registry.addAll(aircrafts).then(()=>{
        console.log('Added the Resources successfully!!!');
    }).catch((error)=> {
        console.log(error);
    })
}

module.exports.createAll = createAll;
