require('dotenv').config();

const axios = require('axios');
const Web3 = require('web3');
const { Parser } = require('json2csv');
const fs = require('fs');
const csvParser = require('csv-parser');

const web3 = new Web3(new Web3.providers.HttpProvider(`https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`));

async function getTransactionData(hash) {
    try {
        const transaction = await web3.eth.getTransaction(hash);
        const receipt = await web3.eth.getTransactionReceipt(hash);

        const data = {
            hash: transaction.hash,
            nonce: transaction.nonce,
            blockHash: transaction.blockHash,
            blockNumber: transaction.blockNumber,
            transactionIndex: transaction.transactionIndex,
            from: transaction.from,
            to: transaction.to,
            value: web3.utils.fromWei(transaction.value, 'ether'),
            gasPrice: web3.utils.fromWei(transaction.gasPrice, 'gwei'),
            gas: transaction.gas,
            input: transaction.input,
            status: receipt.status,
            gasUsed: receipt.gasUsed,
            cumulativeGasUsed: receipt.cumulativeGasUsed,
            timestamp: (await web3.eth.getBlock(transaction.blockNumber)).timestamp,
        };

        // console.log(data);

        return data;
    } catch (error) {
        console.error(error);
    }
}

const promises = [];

fs.createReadStream('transaction_hashes.csv')
    .pipe(csvParser())
    .on('data', (row) => {
        promises.push(getTransactionData(row.hash));
    })
    .on('end', () => {
        Promise.allSettled(promises)
            .then((results) => {
                const fulfilledResults = results
                    .filter(result => result.status === 'fulfilled')
                    .map(result => result.value);

                if (fulfilledResults.length > 0) {
                    const firstDefinedItem = fulfilledResults[0];

                    // console.log("Fields: ", Object.keys(firstDefinedItem));
                    // console.log("First defined item: ", firstDefinedItem);

                    const json2csvParser = new Parser({ fields: Object.keys(firstDefinedItem) });
                    const csv = json2csvParser.parse(fulfilledResults);
                    fs.writeFileSync('transactions.csv', csv);
                }
            })
            .catch((error) => console.error(error));
    });
