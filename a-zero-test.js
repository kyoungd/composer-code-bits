const bnUtil = require('./a-bn-connection-util')
bnUtil.connect(main, "admin@zerotoblockchain-network");

function main(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }

    return bnUtil.connection.getAllAssetRegistries()
    .then((registries) => {
        printRegistries(registries);
        return bnUtil.connection.getAllParticipantRegistries(false);
    }).then((registries)=> {
        printRegistries(registries);
        return bnUtil.connection.getAllTransactionRegistries(false);
    }).then((registries)=> {
        printRegistries(registries);
    }).catch((error)=> {
        console.log(error);
    })
}

function printRegistries(registries) {
    registries.forEach((registry)=> {
        // console.log(registry);
        console.log(registry.registryType, "    ", registry.id );
    })
}

// const namespace = "org.acme.Z2BTestNetwork.Order"

// const bnUtil = require('./a-bn-connection-util');
// bnUtil.connect(main, "admin@zerotoblockchain-network");

// function main(error) {
//     if (error) {
//         console.log(error);
//         process.exit(1);
//     }
//     let bnDef = bnUtil.connection.getBusinessNetwork();
//     console.log("2. Received Definition from Runtime: ",
//                         bnDef.getName(), "   ", bnDef.getVersion());
//     bnUtil.disconnect();
// }

// const utHarness = require('./a-unittest');
// var modelFolder = '../zero/Chapter05';

// utHarness.debug=true;
// utHarness.initialize(modelFolder, (adminCon, bnCon, definition)=>{

//     // Get the registry names
//         console.log("BNA =",definition.getName(),'@',definition.getVersion());

//         // Lets geth the registries
//         return bnCon.getAllAssetRegistries(false).then((registries)=>{
//             registries.forEach((registry)=>{
//                 console.log(registry.id)
//             });
                     
//         });        
// });
