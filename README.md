# wash-trading-detection
A prototype web3js script for automated detection of erc721 wash trading detection

Install Node.js and npm: You can download them from [Node.js website](https://nodejs.org/).

Initialize your project: If you haven't already, create a new directory for your project and run npm init in the terminal. This will create a package.json file.

Install Web3: In your project directory, run npm install web3. This will install the Web3.js library, which is essential for interacting with blockchain.

Navigate to the Project Directory: 
Open a terminal and navigate to the directory where your script (wash.js) is located.

Run the Script: 
Use Node.js to run the script with the required parameters. 
The command format is:

node wash.js <NFT_Contract_Address> <Start_Block_Number> <End_Block_Number>
Replace <NFT_Contract_Address> with the address of the NFT contract, <Start_Block_Number> with the starting block number for the scan, and <End_Block_Number> with the ending block number. 

For example:

node wash.js 0x1234abcd... 1000000 1005000

View the Output:
After the script runs, it will create or update an output.txt file in the same directory. This file contains the suspected wash trades detected in the specified block range.

Ensure you have Node.js installed and that your script has the necessary permissions to run and write files in your environment.

Not every detected event will be a wash trade, the script detects high frequency trades between a limited number of addresses within a limited time frame, frequency and timeframe can be adjusted in script to constrain thresholds.

The output.txt will be located in the same file location as the wash.js script, outptut will contain address pairs, number of suspected wash trades and the transaction number for suspected trades, manually inspect transactions and compare timeframes of suspected wash trades, repeated trades between a limited set of wallet addresses within a short period of time highly indicate patterns of wash trading.

to narrow down suspected wash trading pairs exclude any address pairs that contain contract addresses, wash trading will 
generally occur between a limited set of user addresses.

**If the output contains a large number of transactions the terminal may appear to hang for several minutes while the transactions are being processed.

run walletScan.js to analyze wallets suspected of wash trading after preliminary scan of nft contract token transfer
