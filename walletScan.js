const Web3 = require('web3');
const fs = require('fs');

// Connect to the blockchain network
const web3 = new Web3('https://songbird-api.flare.network/ext/C/rpc');

// Function to fetch transactions of a wallet address
function analyzeForWashTrading(transactions) {
    let transferPairs = new Map(); // To store transaction pairs
    let suspectedWashTrades = [];

    transactions.forEach(tx => {
        // Assuming each transaction object has 'from', 'to', and 'assetId' properties
        let from = tx.from;
        let to = tx.to;
        let assetId = tx.assetId;

        // Create a unique key for each asset and the involved addresses
        let key = `${assetId}-${[from, to].sort().join('-')}`;

        if (!transferPairs.has(key)) {
            transferPairs.set(key, []);
        }

        transferPairs.get(key).push(tx);

        // Analyzing the pattern for each asset and pair of addresses
        let transfers = transferPairs.get(key);
        if (transfers.length > 1) {
            // Check for back and forth transfers which might indicate wash trading
            let recentTransfer = transfers[transfers.length - 1];
            let previousTransfer = transfers[transfers.length - 2];

            if (recentTransfer.from === previousTransfer.to && recentTransfer.to === previousTransfer.from) {
                // If the asset is being transferred back and forth between the same addresses
                suspectedWashTrades.push({
                    assetId: assetId,
                    from: from,
                    to: to,
                    transfers: transfers.map(t => t.transactionHash) // Collecting transaction hashes for evidence
                });
            }
        }
    });

    return suspectedWashTrades;
}


// Main function
async function main() {
    const walletAddress = process.argv[2]; // Wallet address from command line argument
    const fromBlock = process.argv[3] ? parseInt(process.argv[3]) : 0; // Default from the genesis block
    const toBlock = process.argv[4] ? parseInt(process.argv[4]) : 'latest'; // Default to the latest block

    const transactions = await fetchTransactions(walletAddress, fromBlock, toBlock);
    const washTradingPatterns = analyzeForWashTrading(transactions);

    // Output results
    if (washTradingPatterns.length > 0) {
        console.log(`Suspected wash trading transactions for ${walletAddress}:`, washTradingPatterns);
        // Optionally write to a file
        fs.writeFileSync('suspected_wash_trades.txt', JSON.stringify(washTradingPatterns, null, 2));
    } else {
        console.log(`No suspected wash trading transactions found for ${walletAddress}`);
    }
}

main().catch(console.error);
