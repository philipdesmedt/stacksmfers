import { RPCClient } from '@stacks/rpc-client';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import axios from 'axios';

const env = process.env.REACT_APP_NETWORK_ENV || 'testnet';

let coreApiUrl = 'https://stacks-node-api.mainnet.stacks.co';
if (env.includes('mocknet')) {
  coreApiUrl = 'http://localhost:3999';
} else if (env.includes('testnet')) {
  coreApiUrl = 'https://stacks-node-api.testnet.stacks.co';
} else if (env.includes('regtest')) {
  coreApiUrl = 'https://stacks-node-api.regtest.stacks.co';
}

export const getRPCClient = () => {
  return new RPCClient(coreApiUrl);
};

export const nodeApiUrl = coreApiUrl;

export const stacksNetwork = (env === 'mainnet') ? new StacksMainnet() : new StacksTestnet();
stacksNetwork.coreApiUrl = coreApiUrl;

export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
