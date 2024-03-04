import React, { useContext } from 'react';

import Round from './Round';
import { Excerpts } from '../../context';

import { ExcerptList } from '../../types';

const defaultDisplay = {
  name: 'example',
  requireUnique: false,
  rounds: 3,
  categories: [
    {
      name: 'High Excerpts',
      excerpts: 'Alpine\nZarathustra',
      numRequired: 1,
    },
    {
      name: 'Low Excerpts',
      excerpts: 'Carmen\nHeldenleben',
      numRequired: 1,
    },
    {
      name: 'General Excerpts',
      excerpts: 'Pictures\nPetrushka\nLeonore',
      numRequired: 3,
    },
  ],
} as ExcerptList;

export default function Display() {
  const { excerptLists } = useContext(Excerpts);
  const display = excerptLists.lists[excerptLists.selected] || defaultDisplay;

  const { name, categories, rounds, requireUnique } = display;

  return (
    <div>
      <h1>{name}</h1>
      {new Array(rounds).fill(0).map((_, round) => (
        <Round
          key={`round_${round}`}
          {...{ round: round + 1, categories, requireUnique }}
        />
      ))}
    </div>
  );
}
