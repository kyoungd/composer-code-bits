const bnUtil = require('./a-bn-connection-util');
const cardName='admin@airlinev8';
bnUtil.connect(main, cardName);

function main(error) {

    if (error) {
        console.log(error);
        process.exit(1);
    }
    console.log("Event subscription started for: FlightCreated event!!");
    console.log("Received:")
    bnUtil.connection.on('event', (event)=> {
        let fqn = event.$namespace + '.' + event.$type;
        switch (fqn) {
            case 'org.acme.airline.flight.FlightCreated': 
                processFlgihtCreatedEvent(event);       
            break;
            default:
                console.log("Event ignored.  ", event);
            break;
        }
    })
}

function processFlgihtCreatedEvent(event) {
    console.log("flight created event.");
    console.log(JSON.stringify(event));
}

