
module.exports = {
    FileSystemCardStore : require('composer-common').FileSystemCardStore,
    BusinessNetworkConnection: require('composer-client').BusinessNetworkConnection,
    cardName : '',
    connection: {},
    connect: function(callback, card_name) {
        this.cardName = card_name
        var cardType = { type: 'composer-wallet-filesystem' }
        this.connection = new this.BusinessNetworkConnection(cardType);

        this.connection.connect(this.cardName).then(()=>{
            callback();
        }).catch((error)=> {
            callback(error);
        });
    },
    ping: function(callback) {
        this.connection.ping().then((response)=>{
            callback(response);
        }).catch((error)=> {
            callback({}, error);
        })
    },
    disconnect: function(callback) {
        this.connection.disconnect();
    }
}
