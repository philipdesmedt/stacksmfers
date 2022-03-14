import React from 'react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

export const Stacks: React.FC = () => {
  return (
    <section className="relative my-32">
      <div style={{ backgroundSize: '25%', backgroundImage: `url('./assets/mfers.png')`}} className="absolute top-0 left-0 w-full h-full bg-repeat opacity-5" />

      <div className="relative py-16" id="what-is-stacks">
        <div className="mx-auto bg-stone-200 max-w-7xl lg:bg-transparent lg:px-8">
          <div className="lg:grid lg:grid-cols-12">
            <div className="relative z-10 px-4 py-8 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-12 lg:bg-transparent">
              <div className="absolute inset-x-0 h-1/2 lg:hidden" aria-hidden="true" />
              <div className="max-w-md px-4 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-none lg:p-0 bg-gradient-to-tr from-zinc-700 to-stone-800 rounded-3xl">
                <div className="aspect-w-10 aspect-h-6 sm:aspect-w-2 sm:aspect-h-1 lg:aspect-w-1">
                  <img
                    className="object-cover object-center shadow-2xl rounded-3xl"
                    src="./assets/stacks-big-metaverse.png"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="relative bg-stone-200 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-3xl lg:grid lg:grid-cols-10 lg:items-center">
              <div className="relative max-w-md px-4 py-12 mx-auto space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 lg:col-start-4 lg:col-span-6">
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block font-headings">What is Stacks,</span>
                  <span className="block text-transparent font-headings bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">anyway?</span>
                </h2>
                <p className="text-lg text-stone-600">
                  Stacks is an open-source blockchain network that leverages the security and capital of Bitcoin for decentralized apps and smart contracts.
                </p>
                <a
                  href="https://www.stacks.co/"
                  target="_blank"
                  className="inline-flex items-center justify-center px-5 py-3 mt-4 text-base font-medium text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Learn more
                  <ExternalLinkIcon className="w-5 h-5 ml-3 -mr-1 text-white" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
