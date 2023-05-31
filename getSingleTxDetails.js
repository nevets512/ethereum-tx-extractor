require('dotenv').config();

const axios = require('axios');
const Web3 = require('web3');
const { Parser } = require('json2csv');
const fs = require('fs');

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

    return data;
  } catch (error) {
    console.error(error);
  }
}

async function saveToCsv(data, filename) {
    try {
      if (data) {
        const parser = new Parser();
        const csv = parser.parse(data);
        fs.writeFileSync(filename, csv);
      } else {
        console.error('No data to save to CSV');
      }
    } catch (error) {
      console.error(error);
    }
  }
 
const hash = '0xddd75acce9e6a2338de1565bd264d998fa0e0a94965314dd507f4ca5fd6b3207'; // Replace with your transaction hash
getTransactionData(hash)
  .then((data) => saveToCsv(data, 'transaction.csv'))
  .catch((error) => console.error(error));
