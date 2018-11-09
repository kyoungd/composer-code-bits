
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkDefinition = require('composer-common').BusinessNetworkDefinition;
const cardNameForPeerAdmin = "PeerAdmin@hlfv1";
const appName = 'airlinev7';
const bnaDirectory = '../acme-airline/airlinev7';

var walletType = { type: 'composer-wallet-filesystem' };
const adminConnection = new AdminConnection(walletType);

return adminConnection.connect(cardNameForPeerAdmin).then(()=> {
    console.log('Admin login OK');
    upgradeApp();
}).catch((error)=> {
    console.log(error);
});

function upgradeApp() {
    var bnaDef = {};
    BusinessNetworkDefinition.fromDirectory(bnaDirectory).then((definition)=> {
        bnaDef = definition;
        console.log('successfully created the definition... ', bnaDef.appName);
        return adminConnection.install(bnaDef);
    }).then(()=>{
        console.log("successfully installed... ");
        return adminConnection.upgrade(appName, "0.0.3");
    }).then(()=> {
        console.log('App updated successfully!! ', bnaDef.getName(),'  ',bnaDef.getVersion());
        adminConnection.disconnect();
    }).catch((error)=> {
        console.log(error);
    })
}
