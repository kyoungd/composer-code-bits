
const acUtil = require('./a-admin-connection-util');
const cardNameForPeerAdmin = 'PeerAdmin@hlfv1';
const cardNameForNetworkAdmin = 'admin@airlinev7';
const appToBePinged = 'airlinev7';

acUtil.connect(listNetwork, cardNameForPeerAdmin);
function listNetwork(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    console.log("1. Successfully Connected !!!");
    acUtil.list((businessNetworks, error)=> {
        if(error){
            console.log("3. ", error);
        } else {
            console.log("3. Received List Response:");
            businessNetworks.forEach((network) => {
                console.log('Deployed business network', network);
            });
        }
        acUtil.disconnect();
        acUtil.connect(pingNetwork, cardNameForNetworkAdmin);                
    });
}

function pingNetwork(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    console.log("1. Successfully Connected !!!");
    acUtil.ping((response,error)=> {
        if(error){
            console.log(error);
        } else {
            console.log("2. Received Ping Response:");
            console.log(response);
        }
        acUtil.disconnect();
    });
}
