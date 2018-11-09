
function getCards() {
    const NCStoreManager = require('composer-common').NetworkCardStoreManager;
    const idCardStore = NCStoreManager.getCardStore({type: 'composer-wallet-filesystem'});
    return idCardStore.getAll().then(function(cardMap) {
        console.log(cardMap.keys());
        // cardMap.forEach((card) => {
        //     console.log(JSON.stringify(card));
        // });
        let firstCard = cardMap.keys().next().value;
        return idCardStore.get(firstCard);
    }).then(function(idCard) {
        console.log("Pulled First card from file system: ", idCard.getUserName(), '@', idCard.getBusinessNetworkName())
        console.log("Connection Profile Name: ", idCard.getConnectionProfile().name);
    }).catch((error)=> {
        console.log(error);
    })
}

getCards();
