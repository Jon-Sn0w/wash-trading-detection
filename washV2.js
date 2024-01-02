const Web3 = require('web3');
const fs = require('fs');

// Connect to Songbird network
const web3 = new Web3(' https://songbird-api.flare.network/ext/C/rpc ');

// ABI details
const wsgbABI = [{"type":"constructor","stateMutability":"nonpayable","inputs":[{"type":"address","name":"_governance","internalType":"address"},{"type":"string","name":"_name","internalType":"string"},{"type":"string","name":"_symbol","internalType":"string"}]},{"type":"event","name":"Approval","inputs":[{"type":"address","name":"owner","internalType":"address","indexed":true},{"type":"address","name":"spender","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"CreatedTotalSupplyCache","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"Deposit","inputs":[{"type":"address","name":"dst","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"GovernanceProposed","inputs":[{"type":"address","name":"proposedGovernance","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"GovernanceUpdated","inputs":[{"type":"address","name":"oldGovernance","internalType":"address","indexed":false},{"type":"address","name":"newGoveranance","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Transfer","inputs":[{"type":"address","name":"from","internalType":"address","indexed":true},{"type":"address","name":"to","internalType":"address","indexed":true},{"type":"uint256","name":"value","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"event","name":"VotePowerContractChanged","inputs":[{"type":"uint256","name":"_contractType","internalType":"uint256","indexed":false},{"type":"address","name":"_oldContractAddress","internalType":"address","indexed":false},{"type":"address","name":"_newContractAddress","internalType":"address","indexed":false}],"anonymous":false},{"type":"event","name":"Withdrawal","inputs":[{"type":"address","name":"src","internalType":"address","indexed":true},{"type":"uint256","name":"amount","internalType":"uint256","indexed":false}],"anonymous":false},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"allowance","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"address","name":"spender","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"approve","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceHistoryCleanup","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_count","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOf","inputs":[{"type":"address","name":"account","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"balanceOfAt","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256[]","name":"","internalType":"uint256[]"}],"name":"batchVotePowerOfAt","inputs":[{"type":"address[]","name":"_owners","internalType":"address[]"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"claimGovernance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"cleanupBlockNumber","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint8","name":"","internalType":"uint8"}],"name":"decimals","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"decreaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"subtractedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegate","inputs":[{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_bips","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"delegateExplicit","inputs":[{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"_delegateAddresses","internalType":"address[]"},{"type":"uint256[]","name":"_bips","internalType":"uint256[]"},{"type":"uint256","name":"_count","internalType":"uint256"},{"type":"uint256","name":"_delegationMode","internalType":"uint256"}],"name":"delegatesOf","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address[]","name":"_delegateAddresses","internalType":"address[]"},{"type":"uint256[]","name":"_bips","internalType":"uint256[]"},{"type":"uint256","name":"_count","internalType":"uint256"},{"type":"uint256","name":"_delegationMode","internalType":"uint256"}],"name":"delegatesOfAt","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"delegationModeOf","inputs":[{"type":"address","name":"_who","internalType":"address"}]},{"type":"function","stateMutability":"payable","outputs":[],"name":"deposit","inputs":[]},{"type":"function","stateMutability":"payable","outputs":[],"name":"depositTo","inputs":[{"type":"address","name":"recipient","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"governance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IGovernanceVotePower"}],"name":"governanceVotePower","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"increaseAllowance","inputs":[{"type":"address","name":"spender","internalType":"address"},{"type":"uint256","name":"addedValue","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"initialise","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"name","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"needsReplacementVPContract","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"proposeGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"proposedGovernance","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IVPContractEvents"}],"name":"readVotePowerContract","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"revokeDelegationAt","inputs":[{"type":"address","name":"_who","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCleanerContract","inputs":[{"type":"address","name":"_cleanerContract","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCleanupBlockNumber","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setCleanupBlockNumberManager","inputs":[{"type":"address","name":"_cleanupBlockNumberManager","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setGovernanceVotePower","inputs":[{"type":"address","name":"_governanceVotePower","internalType":"contract IIGovernanceVotePower"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setReadVpContract","inputs":[{"type":"address","name":"_vpContract","internalType":"contract IIVPContract"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setWriteVpContract","inputs":[{"type":"address","name":"_vpContract","internalType":"contract IIVPContract"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"symbol","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupply","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupplyAt","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupplyCacheCleanup","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalSupplyHistoryCleanup","inputs":[{"type":"uint256","name":"_count","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalVotePower","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalVotePowerAt","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"totalVotePowerAtCached","inputs":[{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transfer","inputs":[{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"transferFrom","inputs":[{"type":"address","name":"sender","internalType":"address"},{"type":"address","name":"recipient","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferGovernance","inputs":[{"type":"address","name":"_governance","internalType":"address"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"undelegateAll","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"_remainingDelegation","internalType":"uint256"}],"name":"undelegateAllExplicit","inputs":[{"type":"address[]","name":"_delegateAddresses","internalType":"address[]"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"undelegatedVotePowerOf","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"undelegatedVotePowerOfAt","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votePowerFromTo","inputs":[{"type":"address","name":"_from","internalType":"address"},{"type":"address","name":"_to","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votePowerFromToAt","inputs":[{"type":"address","name":"_from","internalType":"address"},{"type":"address","name":"_to","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votePowerOf","inputs":[{"type":"address","name":"_owner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votePowerOfAt","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[{"type":"uint256","name":"","internalType":"uint256"}],"name":"votePowerOfAtCached","inputs":[{"type":"address","name":"_owner","internalType":"address"},{"type":"uint256","name":"_blockNumber","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdraw","inputs":[{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"withdrawFrom","inputs":[{"type":"address","name":"owner","internalType":"address"},{"type":"uint256","name":"amount","internalType":"uint256"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IVPContractEvents"}],"name":"writeVotePowerContract","inputs":[]},{"type":"receive","stateMutability":"payable"}];

const erc721ABI = [
{
	"constant": true,
	"inputs": [{"name": "_tokenId", "type": "uint256"}],
	"name": "ownerOf",
	"outputs": [{"name": "", "type": "address"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": true,
	"inputs": [{"name": "_owner", "type": "address"}],
	"name": "balanceOf",
	"outputs": [{"name": "", "type": "uint256"}],
	"payable": false,
	"stateMutability": "view",
	"type": "function"
},
{
	"constant": false,
	"inputs": [
	{"name": "_from", "type": "address"},
	{"name": "_to", "type": "address"},
	{"name": "_tokenId", "type": "uint256"}
	],
	"name": "transferFrom",
	"outputs": [],
	"payable": false,
	"stateMutability": "nonpayable",
	"type": "function"
},
{
	"anonymous": false,
	"inputs": [
	{"indexed": true, "name": "from", "type": "address"},
	{"indexed": true, "name": "to", "type": "address"},
	{"indexed": true, "name": "tokenId", "type": "uint256"}
	],
	"name": "Transfer",
	"type": "event"
},
];

const wsgbAddress = '0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED'; // WSGB Address
const nftContractAddress = process.argv[2];
const erc721Address = nftContractAddress; // ERC-721 Contract Address

const startBlock = process.argv[3] ? parseInt(process.argv[3]) : 30596167;
let endBlock = process.argv[4] ? parseInt(process.argv[4]) : web3.eth.getBlockNumber();

// Create contract instances
const wsgbContract = new web3.eth.Contract(wsgbABI, wsgbAddress);
const erc721Contract = new web3.eth.Contract(erc721ABI, erc721Address);

// Enhanced thresholds and analysis parameters
const recurrenceThreshold = 5;
const timeThreshold = 7 * 24 * 60 * 60; // Time in seconds (one week)
const transactionValueThreshold = 1; // Minimum transaction value (in Ether) to consider for wash trading
const priceFluctuationThreshold = 0.1; // Threshold for price fluctuation analysis

async function initialize() {
    endBlock = process.argv[4] ? parseInt(process.argv[4]) : await web3.eth.getBlockNumber();
    fetchAndAnalyzeTransactions().then(() => console.log('Blockchain scan complete'));
}

initialize();

// Enhanced wash trading detection function
function detectWashTrading(transactions) {
    let tradingPairs = new Map();
    const excludedAddress = '0x0000000000000000000000000000000000000000';

    transactions.forEach(tx => {
        if (tx.from === excludedAddress || tx.to === excludedAddress || tx.value < transactionValueThreshold) {
            return;
        }

        let pairKey = [tx.from, tx.to].sort().join('-');
        if (!tradingPairs.has(pairKey)) {
            tradingPairs.set(pairKey, { count: 0, transactions: [], timestamps: [], values: [] });
        }

        let data = tradingPairs.get(pairKey);
        data.count++;
        data.transactions.push(tx.hash);
        data.timestamps.push(tx.timestamp);
        data.values.push(tx.value);
        tradingPairs.set(pairKey, data);
    });

    let suspectedWashTrades = {};
    tradingPairs.forEach((data, pairKey) => {
        if (data.count >= recurrenceThreshold && checkTimeThreshold(data.timestamps, timeThreshold) && checkPriceFluctuation(data.values, priceFluctuationThreshold)) {
            suspectedWashTrades[pairKey] = data;
        }
    });

    return suspectedWashTrades;
}

function checkTimeThreshold(timestamps, threshold) {
    let startTime = timestamps[0];
    let count = 1;

    for (let i = 1; i < timestamps.length; i++) {
        if (timestamps[i] - startTime <= threshold) {
            count++;
            if (count >= recurrenceThreshold) {
                return true;
            }
        } else {
            startTime = timestamps[i];
            count = 1;
        }
    }

    return false;
}

function checkPriceFluctuation(values, threshold) {
    let min = values[0];
    let max = values[0];

    for (let value of values) {
        if (value < min) min = value;
        if (value > max) max = value;
    }

    const fluctuation = max - min;
    return fluctuation >= threshold;
}

// Function to fetch and analyze transactions with enhanced filtering
async function fetchAndAnalyzeTransactions() {
    console.log(`Fetching transfer events from block ${startBlock} to ${endBlock}`);
    
    try {
        const events = await erc721Contract.getPastEvents('Transfer', {
            fromBlock: startBlock,
            toBlock: endBlock
        });
        
        console.log(`Fetched ${events.length} transfer events`);
        
        let transactions = [];
        for (let event of events) {
            let block = await web3.eth.getBlock(event.blockNumber);
            let transactionDetails = await web3.eth.getTransaction(event.transactionHash);
            
            if (transactionDetails.value > 0) {
                let value = web3.utils.fromWei(transactionDetails.value, 'ether');
                transactions.push({
                    from: event.returnValues.from,
                    to: event.returnValues.to,
                    tokenId: event.returnValues.tokenId,
                    blockNumber: event.blockNumber,
                    hash: event.transactionHash,
                    timestamp: block.timestamp,
                    value: parseFloat(value)
                });
            }
        }
        
        const washTrades = detectWashTrading(transactions);
        
        let output = '';
        for (const [pair, data] of Object.entries(washTrades)) {
            output += `Pair ${pair} has ${data.count} suspected wash trades. Transactions: ${data.transactions.join(', ')}\n`;
        }
        
        fs.writeFileSync('output.txt', output);
        
    } catch (error) {
        console.error(`Error fetching transfer events: ${error}`);
    }
    
    console.log('Analysis complete');
}
