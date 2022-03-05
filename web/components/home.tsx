import React from 'react';
import { Box, BoxProps } from '@blockstack/ui';
import { stacksNetwork as network } from '@common/utils';
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';
import { NavLink as RouterLink } from 'react-router-dom';

export const Container: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box className="bg-gray-100 min-h-screen w-full" {...props}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </Box>
  );
};

export const Home: React.FC = () => {
  return (
    <Box>
      <Container>
        <main className="py-12">
          <div className="grid justify-items-center">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl text-center leading-none font-extrabold tracking-tight text-gray-900 mb-8 sm:mb-10">
              Mfers go multichain! <br/>
              Own one of 4269 unique Stacks Mfers.
            </h3>
            <img className="flex items-center" src="assets/header_stacks_mfers.jpeg" />

            <p className="mt-12 text-4xl text-center text-yellow-800 font-bold mb-10 space-y-6 mb-10">
              <a href="#" className="ml-3 inline-flex justify-center py-6 px-6 border border-transparent shadow-sm text-4xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Minting Soon!
              </a>
            </p>

            <p className="mt-8">Stacks Mfers is not affiliated with the OG mfers of Sartoshi</p>
          </div>
        </main>
      </Container>
    </Box>  
  );
};
