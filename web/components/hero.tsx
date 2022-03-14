import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/outline';

export const Hero: React.FC = () => {
  return (
    <main className="relative overflow-hidden bg-white">
      <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block mb-4 text-stone-900 font-headings">Mfers go multichain!</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">Own one of 4269 unique Stacks Mfers.</span>
              </span>
            </h1>
            <p className="mt-3 text-base text-stone-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              <span className="font-bold">Whitelist Mint</span>: 21st of March <br/>
              <span className="font-bold">Public Mint</span>: 22nd of March <br/>
              <span className="font-bold">Reveal</span>: 24th of March <br/>
              See you at the mint mfers!
            </p>
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
