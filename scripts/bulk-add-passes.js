require('dotenv').config();
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const tx = require('@stacks/transactions');
const utils = require('./utils');
const network = utils.resolveNetwork();
const BN = require('bn.js');

async function transact() {
  const list = tx.listCV([
    tx.tupleCV({ 'caller': tx.standardPrincipalCV('STWKDKPZ3QDPQGDADWJ3EWPAP14CB1N1HCF7JZNN'), 'amount': tx.uintCV(100) }),
  ]);
  const txOptions = {
    contractAddress: CONTRACT_ADDRESS,
    contractName: 'stacks-mfers',
    functionName: 'bulk-add-passes',
    functionArgs: [list],
    senderKey: process.env.STACKS_PRIVATE_KEY,
    postConditionMode: 1,
    network
  };

  const transaction = await tx.makeContractCall(txOptions);
  const result = tx.broadcastTransaction(transaction, network);
  await utils.processing(result, transaction.txid(), 0);
};

transact();
