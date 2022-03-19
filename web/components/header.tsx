import React, { Fragment, useContext } from 'react';
import { AppContext } from '@common/context';
import { useConnect } from '@stacks/connect-react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { NavLink as RouterLink } from 'react-router-dom';

const navigation = [
  { name: 'Mint', href: '#mint' },
  { name: 'What is Stacks?', href: '#what-is-stacks' },
  { name: 'Team', href: '#team' },
]

interface HeaderProps {
  signOut: () => void;
}
export const Header: React.FC<HeaderProps> = ({ signOut }) => {
  const [state, _] = useContext(AppContext);
  const showWallet = true;
  const { doOpenAuth } = useConnect();

  return (
    <Popover>
      <nav
        className="relative flex items-center justify-between px-4 py-6 mx-auto max-w-7xl sm:px-6"
        aria-label="Global"
      >
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <RouterLink
              to="/"
              className="text-4xl font-bold font-headings text-stone-900"
            >
              Stacks Mfers
            </RouterLink>
            <div className="flex items-center -mr-2 md:hidden">
              <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                <span className="sr-only">Open main menu</span>
                <MenuIcon className="w-6 h-6" aria-hidden="true" />
              </Popover.Button>
            </div>
          </div>
          <div className="hidden md:block md:ml-10 md:space-x-10">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="font-medium text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="hidden text-right md:block">
          <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
            {state.userData ? (
              <div className="flex items-center justify-between shrink-0">
                <div className="flex space-x-6 shrink-0">
                  <button
                    type="button"
                    className="block px-3 py-1.5 text-sm font-medium bg-sky-400 hover:bg-sky-500 text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                    onClick={() => { signOut() }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-6">
                {showWallet ? (
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      onClick={() => doOpenAuth()}>
                      <span>Connect Wallet</span>
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </span>
        </div>
      </nav>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 p-2 transition origin-top-right transform md:hidden"
        >
          <div className="overflow-hidden bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div className="text-2xl font-bold font-headings">
                Stacks Mfers
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500">
                  <span className="sr-only">Close main menu</span>
                  <XIcon className="w-6 h-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {state.userData ? (
              <div className="flex items-center justify-between shrink-0">
                <div className="flex mb-4 ml-4 space-x-6 shrink-0">
                  <button
                    type="button"
                    className="block px-3 py-1.5 text-sm font-medium text-cyan-500 hover:text-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={() => { signOut() }}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center mb-4 ml-4 space-x-6">
                {showWallet ? (
                  <div>
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent bg-gradient-to-r from-blue-600 via-pink-500 to-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      onClick={() => doOpenAuth()}>
                      <span>Connect Wallet</span>
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

