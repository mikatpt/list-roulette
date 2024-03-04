import React from 'react';
import { Category } from '../../types';

interface Props {
  round: number;
  categories: Category[];
  requireUnique: boolean;
}

export default function Round({ round, categories, requireUnique }: Props) {
  const toDisplay = randomize(categories, requireUnique);
  return (
    <div>
      <h2>{`Round ${round}`}</h2>
      <ol>
        {toDisplay.map((excerpt, i) => (
          <li key={i}>{excerpt}</li>
        ))}
      </ol>
    </div>
  );
}

const randomize = (categories: Category[], requireUnique: boolean) => {
  const res: string[] = [];

  categories.forEach(({ excerpts, numRequired }) => {
    const list = excerpts.trim().split('\n');
    list.sort(() => Math.random() - 0.5);
    let len = list.length;
    for (let i = 0; i < numRequired; i++) {
      if (!requireUnique) res.push(list[len - i - 1]);
      else if (requireUnique && i < len) {
        res.push(list.pop());
        len--;
      }
    }
  });

  return res;
};
