
const AdminConnection = require('composer-admin').AdminConnection;

const cardNameForPeerAdmin = 'PeerAdmin@hlfv1';
const cardNameForNetworkAdmin = 'admin@airlinev7';
const appToBePinged = 'airlinev7';

const adminConnection = new AdminConnection({type: 'composer-wallet-filesystem'});

return adminConnection.connect(cardNameForPeerAdmin).then(function(){
    console.log('admin logged');
    listBusinessNetwork();
    adminConnection.disconnect();
}).catch((error) => {
    console.log(error);
})

function listBusinessNetwork() {
    adminConnection.list().then((networks)=> {
        console.log("Successfully retrieved the deployed Networks: ",networks);
        networks.forEach((businessNetwork) => {
            console.log('Deployed business network', businessNetwork);
        });
        adminConnection.disconnect();
        adminConnection.connect(cardNameForNetworkAdmin).then(function() {
            adminConnection.ping(appToBePinged).then(function(response) {
                console.log('ping result: ', response);
            });
        }).catch((error)=> {
            console.log(error);
        });
    }).catch((error)=> {
        console.log(error);
    });
}
