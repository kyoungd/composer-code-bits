const bnUtil = require('./a-bn-connection-util');

bnUtil.connect(main, "admin@airlinev7");

function main(error) {
    if(error){
        console.log(error);
        process.exit(1);
    }
    console.log("1. Successfully Connected !!!");
    bnUtil.ping((response, error)=> {
        if(error){
            console.log(error);
        } else {
            console.log("2. Received Ping Response:");
            console.log(response);
        }
        bnUtil.disconnect();
        console.log("3. Disconnected");
    });
}
