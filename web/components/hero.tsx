import React, { useContext, useEffect, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';
import { AppContext } from '@common/context';
import { useConnect } from '@stacks/connect-react';
import { stacksNetwork as network } from '@common/utils';
import {
  callReadOnlyFunction,
  cvToJSON,
  standardPrincipalCV,
} from '@stacks/transactions';
import { useSTXAddress } from '@common/use-stx-address';

export const Hero: React.FC = () => {
  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '';
  const [state, _] = useContext(AppContext);
  const { doOpenAuth } = useConnect();
  const stxAddress = useSTXAddress();

  const [itemsLeft, setItemsLeft] = useState(4269);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNumberOfItems = async () => {
      const itemsCall = await callReadOnlyFunction({
        contractAddress,
        contractName: 'stacks-mfers',
        functionName: 'get-last-token-id',
        functionArgs: [],
        senderAddress: contractAddress,
        network: network,
      });

      const count = cvToJSON(itemsCall).value.value;
      setItemsLeft(4269 - count);
      setIsLoading(false);
    };

    fetchNumberOfItems();
  }, []);

  return (
    <main className="relative overflow-hidden bg-white">
      <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block mb-4 text-stone-900 font-headings">Mfers go multichain!</span>
                <span className="block mt-8 text-transparent text-center bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">Mfers left</span>
              </span>
            </h1>

            {isLoading ? (
              <p className="mt-3 text-base text-center text-stone-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Loading data mfer...
              </p>
            ) : (
              <>
                <p className="mt-3 text-3xl text-center block text-transparent text-center bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">
                  {itemsLeft} / 4269
                </p>
                {state.userData ? (
                  <a
                    href="#mint"
                    className="block m-auto w-1/2 px-4 py-2 mt-4 text-2xl font-medium text-center text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    Mint
                  </a>
                ) : (
                  <p className="mt-4 text-center">
                    <button
                      type="button"
                      className="inline-flex items-center text-lg px-4 py-2 text-sm font-medium text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      onClick={() => doOpenAuth()}>
                      <span>Connect Wallet</span>
                    </button>
                  </p>
                )}
                <p className="mt-4 text-center text-base text-stone-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Public Mint: 22nd of March - 4:20pm CET <br/>
                  Reveal: 24th of March - 4:20pm CET <br/>
                </p>
              </>
            )}

            <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
              <p className="flex items-center text-base font-medium text-stone-900">
                <InformationCircleIcon className="w-5 h-5 mr-2 shrink-0" />
                Stacks Mfers is not affiliated with the OG mfer Sartoshi
              </p>
            </div>
          </div>
          <div className="relative mt-12 sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="overflow-hidden mx-auto lg:absolute lg:top-0 lg:transform lg:-translate-x-56 lg:-translate-y-48 lg:left-1/2 w-[800px] h-[500px] lg:w-[1200px] lg:h-[800px] rounded-xl bg-gradient-to-tr from-zinc-700 to-stone-800 lg:-rotate-[15deg]">
              <div style={{ backgroundSize: '85%', backgroundImage: `url('./assets/mfers.png')`}} className="lg:absolute lg:top-0 lg:left-0 w-full h-full bg-repeat border-4 rounded-xl border-stone-900 lg:rotate-25 filter brightness-100 blur-0" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
