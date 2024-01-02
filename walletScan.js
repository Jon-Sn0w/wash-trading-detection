const Web3 = require('web3');
const fs = require('fs');

// Connect to the blockchain network
const web3 = new Web3('https://songbird-api.flare.network/ext/C/rpc');
const ERC721_TRANSFER_EVENT_SIGNATURE = web3.utils.sha3('Transfer(address,address,uint256)');

async function fetchTransactions(walletAddress, fromBlock, toBlock) {
	try {
		const events = await web3.eth.getPastLogs({
			fromBlock: fromBlock,
			toBlock: toBlock,
			topics: [ERC721_TRANSFER_EVENT_SIGNATURE, null, web3.utils.padLeft(walletAddress, 64)],
		});
		
		return events.map(event => {
			// Ensure the topics are correctly formatted
			const from = event.topics[1] ? '0x' + event.topics[1].slice(26) : null;
			const to = event.topics[2] ? '0x' + event.topics[2].slice(26) : null;
			const tokenId = event.topics[3] ? web3.utils.toBN(event.topics[3]).toString() : null;
			
			return { from, to, tokenId, transactionHash: event.transactionHash };
		});
	} catch (error) {
		console.error(`Error fetching transactions: ${error}`);
		return [];
	}
}


// Function to fetch transactions of a wallet address
function analyzeForWashTrading(transactions) {
	let transferPairs = new Map(); // To store transaction pairs
	let suspectedWashTrades = [];
	
	transactions.forEach(tx => {
		let from = tx.from;
		let to = tx.to;
		let assetId = tx.assetId;
		
		// Create a unique key for each asset and the involved addresses
		let key = `${assetId}-${[from, to].sort().join('-')}`;
		
		if (!transferPairs.has(key)) {
			transferPairs.set(key, []);
		}
		
		transferPairs.get(key).push(tx);
		
		// Analyze the pattern for each asset and pair of addresses
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
