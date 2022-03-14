
import React from 'react';

const people = [
  {
    name: '@sara_nmt',
    role: 'artist mfer',
    imageUrl: './assets/team/sara_nmt.jpg',
    twitterUrl: 'https://twitter.com/sara_nmt',
  },
  {
    name: '@philipdesmedt',
    role: 'tech guru mfer',
    imageUrl: './assets/team/philipdesmedt.jpg',
    twitterUrl: 'https://twitter.com/philipdesmedt',
  },
  {
    name: '@novio_eth',
    role: 'NFT geek mfer',
    imageUrl: './assets/team/novio_eth.jpg',
    twitterUrl: 'https://twitter.com/novio_eth',
  },
]

export const Team: React.FC = () => {
  return (
    <section className="relative px-4 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <img className="mb-12" src="./assets/header_stacks_mfers.jpg" alt="" />

      <div className="space-y-12" id="team">
        <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl font-headings text-stone-900">Our team of mfers</h2>
          <p className="text-xl text-stone-500">
            We're all mfers who care about Bitcoin.
          </p>
        </div>
        <ul role="list" className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
          {people.map((person) => (
            <li key={person.name} className="px-6 py-10 text-center rounded-lg bg-gradient-to-tr from-zinc-700 to-stone-800 xl:px-10 xl:text-left">
              <div className="space-y-6 xl:space-y-10">
                <img className="w-40 h-40 mx-auto rounded-full xl:w-56 xl:h-56" src={person.imageUrl} alt="" />
                <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                  <div className="space-y-1 text-lg font-medium leading-6">
                    <h3 className="text-white">{person.name}</h3>
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500">{person.role}</p>
                  </div>

                  <ul role="list" className="flex justify-center space-x-5">
                    <li>
                      <a href={person.twitterUrl} className="text-stone-400 hover:text-stone-300">
                        <span className="sr-only">Twitter</span>
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
