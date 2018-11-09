
module.exports = {
    AdminConnection: require('composer-admin').AdminConnection,
    connection: {}, 
    connect: function (callback, cardName) {
        this.connection = new this.AdminConnection({type: 'composer-wallet-filesystem'});
        this.connection.connect(cardName).then(()=> {
            callback();
        }).catch((error)=> {
            callback(error);
        })
    },
    list: function(callback) {
        this.connection.list().then((networks) => {
            callback(networks);
        }).catch((error)=> {
            callback({}, error);
        });
    },
    ping: function(callback) {
        this.connection.ping().then((response) => {
            callback(response);
        }).catch((error)=> {
            callback({}, error);
        });
    },
    disconnect: function () {
        this.connection.disconnect();
        console.log('Admin disconnected.')
    }
} 
