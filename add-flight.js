'use strict';
/**
 * Part of a course on Hyperledger Fabric: 
 * http://ACloudFan.com
 * 
 * Exercise:
 * Create a new flight resource instance and add it to the Flight Registry
 */

const aircraftNamespace = 'org.acme.airline.flight';
const aircraftType = 'Flight';

// 1. Connect
const bnUtil = require('./a-bn-connection-util');
bnUtil.connect(main, "admin@airlinev8");

function main(error){
    // Check for the connection error
    if(error){
        console.log(error);
        process.exit(1);
    }

    // 2. Get the aircraft AssetRegistry
    return bnUtil.connection.getAssetRegistry(aircraftNamespace+'.'+aircraftType).then((registry)=>{
        console.log('1. Received Registry: ', registry.id);

        // Utility method for adding the aircrafts
        addFlight(registry);

    }).catch((error)=>{
        console.log(error);
       // bnUtil.disconnect();
    });
}

 // Parameter is a AssetRegistry
function addFlight(registry){
    const  bnDef = bnUtil.connection.getBusinessNetwork();
    const  factory = bnDef.getFactory();
    let    flightResource = factory.newResource(aircraftNamespace,aircraftType,'AE201-05-05-2020');
    flightResource.setPropertyValue('flightNumber','AE101');
    flightResource.route = factory.newConcept(aircraftNamespace,'Route');
    flightResource.route.setPropertyValue('origin', 'EWR');
    flightResource.route.setPropertyValue('destination' , 'ATL');
    flightResource.route.setPropertyValue('schedule' , new Date('2018-10-15T21:44Z'));

    return registry.add(flightResource).then(()=>{
        console.log('Successfully created the flight!!!');
        bnUtil.disconnect();
    }).catch((error)=>{
        console.log(error);
       bnUtil.disconnect();
    });
}