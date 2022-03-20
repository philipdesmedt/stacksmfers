import React from 'react';
import { useLocation } from "react-router-dom";

export const HeroThanks: React.FC = () => {
  const search = useLocation().search;
  const txid = new URLSearchParams(search).get('txid');

  return (
    <main className="relative overflow-hidden bg-white h-full min-h-screen">
      <div className="px-4 mx-auto mt-16 max-w-7xl sm:mt-24 sm:px-6 lg:mt-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1>
              <span className="block mt-1 text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl">
                <span className="block mb-4 text-stone-900 text-center font-headings">Well done Mfer!</span>
                <span className="block mt-8 text-transparent text-center bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">You will be a Stacks Mfer soon</span>
              </span>
            </h1>

            <p className="text-center text-base text-stone-500 sm:text-xl lg:text-lg xl:text-xl mt-16">
              <a href={`https://explorer.stacks.co/txid/${txid}`} className="inline-flex items-center text-lg px-4 py-2 text-sm font-medium text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500" target="_blank">Click here to follow your transaction in the Explorer</a> <br/>
            </p>
            <p className="text-center text-base text-stone-500 sm:text-xl lg:text-lg xl:text-xl mt-16">
              In the meantime, join us on <a href="https://www.twitter.com/StacksMfers" target="_blank" className="text-pink-500">Twitter</a> cause we're all chilling and vibing mfer
            </p>
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
