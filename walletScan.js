const Web3 = require('web3');
const fs = require('fs');

// Connect to the blockchain network
const web3 = new Web3('https://songbird-api.flare.network/ext/C/rpc');
const ERC721_TRANSFER_EVENT = web3.utils.sha3('Transfer(address,address,uint256)');

async function fetchTransactions(walletAddress, fromBlock, toBlock) {
	try {
		const events = await web3.eth.getPastLogs({
			fromBlock: fromBlock,
			toBlock: toBlock,
			topics: [ERC721_TRANSFER_EVENT, null, web3.utils.padLeft(walletAddress, 64)],
		});
		
		return events.map(event => {
			const from = event.topics[1] ? '0x' + event.topics[1].slice(26) : null;
			const to = event.topics[2] ? '0x' + event.topics[2].slice(26) : null;
			
			// Extract tokenId from the third topic
			let tokenId = event.topics[3] ? web3.utils.hexToNumberString(event.topics[3]) : null;
			
			return { from, to, tokenId, transactionHash: event.transactionHash };
		});
	} catch (error) {
		console.error(`Error fetching transactions: ${error}`);
		return [];
	}
}

// Function to fetch transactions of a wallet address
function analyzeForWashTrading(transactions) {
	let transferPairs = new Map();
	let suspectedWashTrades = [];
	
	transactions.forEach(tx => {
		let from = tx.from;
		let to = tx.to;
		let assetId = tx.assetId; // Ensure this is correctly set
		
		let pairKey = `${assetId}-${[from, to].sort().join('-')}`;
		
		if (!transferPairs.has(pairKey)) {
			transferPairs.set(pairKey, []);
		}
		
		transferPairs.get(pairKey).push(tx);
		
		let transfers = transferPairs.get(pairKey);
		if (transfers.length > 1) {
			let recentTransfer = transfers[transfers.length - 1];
			let previousTransfer = transfers[transfers.length - 2];
			
			if (recentTransfer.from === previousTransfer.to && recentTransfer.to === previousTransfer.from) {
				suspectedWashTrades.push({
					assetId: assetId,
					from: from,
					to: to,
					transfers: [recentTransfer.transactionHash, previousTransfer.transactionHash]
				});
			}
		}
	});
	
	// Add verbose logging for inspection
	console.log('All transfers:', transferPairs);
	console.log('Suspected wash trades:', suspectedWashTrades);
	
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
