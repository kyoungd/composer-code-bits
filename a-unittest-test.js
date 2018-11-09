const utHarness = require('./a-unittest');
var modelFolder = '../acme-airline/airlinev7';

utHarness.debug=true;
utHarness.initialize(modelFolder, (adminCon, bnCon, definition)=>{

    // Get the registry names
        console.log("BNA =",definition.getName(),'@',definition.getVersion());

        // Lets geth the registries
        return bnCon.getAllAssetRegistries(false).then((registries)=>{
            registries.forEach((registry)=>{
                console.log(registry.id)
            });
                     
        });        
});
