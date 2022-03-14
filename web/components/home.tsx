import React from 'react';
import { Hero } from './hero';
import { Stacks } from './stacks';
import { Team } from './team';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />

      <Stacks />

      <Team />

    </>
  );
};
