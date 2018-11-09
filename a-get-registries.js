
const bnUtil = require('./a-bn-connection-util')

bnUtil.connect(main, "admin@airlinev7");

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
        console.log(registry.registryType, "    ", registry.name );
    })
}
