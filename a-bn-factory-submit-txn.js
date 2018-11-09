const namespace = "org.acme.airline.flight"
const transactionType = "CreateFlight"

const bnUtil = require('./a-bn-connection-util');
bnUtil.connect(main, "admin@airlinev7");

function main(error) {
    if (error) {
        console.log(error);
        process.exit(1);
    }
    let bnDef = bnUtil.connection.getBusinessNetwork();
    console.log("2. Received Definition from Runtime: ",
                        bnDef.getName(), "   ", bnDef.getVersion());
    let factory = bnDef.getFactory();
    let options = {
        generate: false,
        includeOptionalFields: false
    }
    let flightId = "AE101-05-06-2019";
    let transaction = factory.newTransaction(namespace, transactionType, flightId, options);
    transaction.setPropertyValue('flightNumber', 'AE101');
    transaction.setPropertyValue('origin', 'EWR');
    transaction.setPropertyValue('destination', 'ATL');
    transaction.setPropertyValue('schedule', new Date('2019-05-06T21:44Z'));
    return bnUtil.connection.submitTransaction(transaction).then(()=> {
        console.log("6. Transaction Submitted/Processed Successfully!!");
        bnUtil.disconnect();
    }).catch((error)=> {
        console.log(error);
        bnUtil.disconnect();
    })
}
