# Ethereum Transaction Data Extractor

This repository contains Node.js scripts for extracting Ethereum transaction data given their hashes. It uses [Alchemy](https://www.alchemyapi.io/) as the Ethereum node and [Web3.js](https://web3js.readthedocs.io/en/v1.3.4/) library for interacting with Ethereum blockchain.

There are two scripts in this project:

1. `getTxDetails.js`: This script extracts details of multiple Ethereum transactions and saves the data into a CSV file. It leverages the [json2csv](https://www.npmjs.com/package/json2csv) library for formatting the output data.

2. `getSingleTxDetails.js`: This script extracts details of a single Ethereum transaction and saves the data into a CSV file.

## Prerequisites

Before you begin, you need to have Node.js and npm (Node Package Manager) installed on your machine. You can download Node.js and npm from the [official site](https://nodejs.org/en/download/). To check the installation, open your terminal and run:

```bash
node --version
npm --version
```

## Setup

1. Clone the repository:

```bash
git clone https://github.com/your-username/eth-tx-extractor.git
cd eth-tx-extractor
```

2. Install the dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your Alchemy API key:

```env
ALCHEMY_API_KEY=your_alchemy_api_key
```

Replace `your_alchemy_api_key` with your actual Alchemy API key.

## Usage

### For `getTxDetails.js`:

1. Prepare a CSV file named `transaction_hashes.csv` in the root directory. The file should contain the Ethereum transaction hashes you want to extract the details for.

2. Run the script:

```bash
node getTxDetails.js
```

3. The script will create a new file named `transactions.csv` in the root directory. This file contains the details of the Ethereum transactions.

### For `getSingleTxDetails.js`:

1. You need to replace the `hash` value in the script with your transaction hash.

```javascript
const hash = 'your_transaction_hash'; // Replace with your transaction hash
```

2. Run the script:

```bash
node getSingleTxDetails.js
```

3. The script will create a new file named `transaction.csv` in the root directory. This file contains the details of the single Ethereum transaction.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
