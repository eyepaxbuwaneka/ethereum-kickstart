const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('../ethereum/build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'man urban tool spice rotate fashion mouse deposit conduct prize rug pattern',
    'https://rinkeby.infura.io/v3/63d048d7a96a4cc3ba75824fc1b8bc5c'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('attemption to deploy from the account: ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
        .send({gas: 1000000, from: accounts[0]});

        console.log('contract deployed to' , result.options.address);
};
deploy();   