import React from 'react';
import { Hero } from './hero';
import { Packs } from './packs';
import { Stacks } from './stacks';
import { Team } from './team';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />

      <Packs />

      <Stacks />

      <Team />
    </>
  );
};
