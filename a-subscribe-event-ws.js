let counter = 0;

let WebSocketClient = require('websocket').client;
let client = new WebSocketClient();

client.on('connectFailed', function(error) {
    console.log('Conection Error: ' + error.toString());
});

client.on('connect', (connection)=> {
    console.log('connected to hyperledger REST-SERVER over a websocket.');
    connection.on('message', (msg)=> {
        var event = JSON.parse(msg.utf8Data);
        switch(event.$class) {
            case 'org.acme.airline.flight.FlightCreated':
                processFlgihtCreatedEvent(event);
                break;
            default:
                break;
        }
    })
})

client.connect('ws://localhost:3000');

function processFlgihtCreatedEvent(event) {
    console.log("flight created event.");
    console.log(JSON.stringify(event));
}
