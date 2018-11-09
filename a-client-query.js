
const bnUtil = require('./a-bn-connection-util');
bnUtil.connect(main, 'admin@airlinev8');

function main(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    return bnUtil.connection.query('AllFlights')
    .then((results)=> {
        console.log('Received flight count:', results.length)
        results.forEach((result) => {
            console.log(result);
        });
        var   statement = 'SELECT  org.acme.airline.aircraft.Aircraft WHERE (aircraftId == _$id)';
        return bnUtil.connection.buildQuery(statement);
    }).then((qry)=> {
        return bnUtil.connection.query(qry, {id:'CRAFT01'});
    }).then((result)=> {
        console.log('\n\n Received aircraft count:', result.length);
        console.log(result);
        bnUtil.disconnect();
    }).catch((error)=> {
        console.log(error)
        bnUtil.disconnect();
    })
}
