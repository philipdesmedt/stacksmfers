import React, { useEffect } from 'react';
import { CheckIcon, GiftIcon } from '@heroicons/react/solid';
import { stacksNetwork as network } from '@common/utils';
import { useSTXAddress } from '@common/use-stx-address';
import {
  createAssetInfo,
  makeSTXTokenTransfer,
  cvToJSON,
  makeStandardSTXPostCondition,
  standardPrincipalCV,
  uintCV,
  FungibleConditionCode,
  NonFungibleConditionCode,
  makeContractNonFungiblePostCondition,
  makeContractSTXPostCondition,
} from '@stacks/transactions';
import { useConnect } from '@stacks/connect-react';
import BN from 'bn.js';

const tiers = [
  {
    id: 1,
    name: 'Single',
    href: '#',
    price: 6.9,
    features: [
      '1 Mfer',
      '0 Mfers FREE'
    ],
    fn: 'claim',
  },
  {
    id: 2,
    name: 'Degen',
    href: '#',
    price: 34.5,
    features: [
      '5 Mfers',
      '1 Mfer FREE'
    ],
    fn: 'claim-five',
  },
  {
    id: 3,
    name: 'Irresponsibly Long',
    href: '#',
    price: 69,
    features: [
      '10 Mfers',
      '3 Mfers FREE'
    ],
    fn: 'claim-ten',
  },
  {
    id: 4,
    name: 'Michael Saylor Gigachad',
    href: '#',
    price: 172.5,
    features: [
      '25 Mfer',
      '10 Mfers FREE'
    ],
    fn: 'claim-twenty-five',
  },
]

export const Packs = () => {
  const basicPrice = 6900000;
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
  const stxAddress = useSTXAddress();
  const { doContractCall } = useConnect();

  const claim = async () => {
    const postConditions = [
      makeStandardSTXPostCondition(
        stxAddress || '',
        FungibleConditionCode.LessEqual,
        uintCV(basicPrice).value
      ),
      makeContractSTXPostCondition(
        contractAddress,
        'stacks-mfers',
        FungibleConditionCode.LessEqual,
        uintCV(basicPrice).value
      ),
    ];

    await doContractCall({
      network,
      contractAddress,
      stxAddress,
      contractName: 'stacks-mfers',
      functionName: 'claim',
      functionArgs: [],
      postConditions,
      onFinish: data => { window.location.href = `/thanks?txid=${data['txId']}` },
    });
  };

  const claimFive = async () => {
    const postConditions = [
      makeStandardSTXPostCondition(
        stxAddress || '',
        FungibleConditionCode.LessEqual,
        uintCV(5 * basicPrice).value
      ),
      makeContractSTXPostCondition(
        contractAddress,
        'stacks-mfers',
        FungibleConditionCode.LessEqual,
        uintCV(5 * basicPrice).value
      ),
    ];

    await doContractCall({
      network,
      contractAddress,
      stxAddress,
      contractName: 'stacks-mfers',
      functionName: 'claim-five',
      functionArgs: [],
      postConditions,
      onFinish: data => { window.location.href = `/thanks?txid=${data['txId']}` },
    });
  };

  const claimTen = async () => {
    const postConditions = [
      makeStandardSTXPostCondition(
        stxAddress || '',
        FungibleConditionCode.LessEqual,
        uintCV(10 * basicPrice).value
      ),
      makeContractSTXPostCondition(
        contractAddress,
        'stacks-mfers',
        FungibleConditionCode.LessEqual,
        uintCV(10 * basicPrice).value
      ),
    ];

    await doContractCall({
      network,
      contractAddress,
      stxAddress,
      contractName: 'stacks-mfers',
      functionName: 'claim-ten',
      functionArgs: [],
      postConditions,
      onFinish: data => { window.location.href = `/thanks?txid=${data['txId']}` },
    });
  };

  const claimTwentyFive = async () => {
    const postConditions = [
      makeStandardSTXPostCondition(
        stxAddress || '',
        FungibleConditionCode.LessEqual,
        uintCV(25 * basicPrice).value
      ),
      makeContractSTXPostCondition(
        contractAddress,
        'stacks-mfers',
        FungibleConditionCode.LessEqual,
        uintCV(25 * basicPrice).value
      ),
    ];

    await doContractCall({
      network,
      contractAddress,
      stxAddress,
      contractName: 'stacks-mfers',
      functionName: 'claim-twenty-five',
      functionArgs: [],
      postConditions,
      onFinish: data => { window.location.href = `/thanks?txid=${data['txId']}` },
    });
  };

  return (
    <section className="relative my-16 pb-16 bg-white">
      <div id="mint">
        <div className="px-4 pt-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col">
            <h1 className="text-5xl font-extrabold text-gray-900 font-headings">Mfing Mint Packs</h1>
            <p className="mt-5 text-xl text-gray-500">
              Do you dare to mint mfer?
            </p>
          </div>
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-4">
            {tiers.map((tier) => (
              <div key={tier.name} className={`border-2 divide-y-2 rounded-lg shadow-sm rounded-xl border-stone-900 divide-stone-900 ${tier.id === 4 ? 'opacity-50' : ''}`}>
                <div className="p-6">
                  <h2 className="text-xl font-medium leading-6 text-gray-900 font-headings">{tier.name}</h2>
                  <h3 className="text-xl font-medium leading-6 text-gray-900 font-headings">{tier.id === 4 ? 'Limited!' : ''}</h3>
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900 font-headings">{tier.price}</span>{' '}
                    <span className="text-base font-medium text-gray-500">STX</span>
                  </p>
                </div>
                <div className="px-6 pt-6 pb-8">
                  <h3 className="text-xs font-medium tracking-wide text-gray-500 uppercase">What's included</h3>
                  <ul role="list" className="mt-6 space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={feature} className="flex items-center space-x-3">
                        {index === 0 ? (
                          <CheckIcon className="flex-shrink-0 w-5 h-5 text-sky-500" aria-hidden="true" />
                          ) : (
                          <GiftIcon className="flex-shrink-0 w-5 h-5 text-pink-500" aria-hidden="true" />
                        )}
                        <span className="text-lg text-gray-900">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => { tier.id === 1 ? claim() : tier.id === 2 ? claimFive() : tier.id === 3 ? claimTen() : claimTwentyFive() }}
                    className="block w-full px-4 py-2 mt-4 text-sm font-medium text-center text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Mint
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
