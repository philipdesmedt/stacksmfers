require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();
const BN = require('bn.js');

async function transact() {
  const list = tx.listCV([
    tx.tupleCV({ 'caller': tx.standardPrincipalCV('SP2M7K3YM8813404G1R7AXV106CPWH0Z5ZA80JVAV'), 'amount': tx.uintCV(80) }),
  ]);
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'stacks-mfers',
    functionName: 'bulk-add-passes',
    functionArgs: [list],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    postConditionMode: 1,
    nonce: new BN(26, 10),
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();
