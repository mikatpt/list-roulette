import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { ListStore } from './types';
import { isElectron } from './utils';

export type ContextType = {
  excerptLists: ListStore;
  setLists: (excerptLists: ListStore) => void;
};

export const Excerpts = createContext<ContextType | null>(null);

export const ExcerptsContextProvider = ({ children }: { children: ReactNode }) => {
  const [excerptLists, setExcerptLists] = useState<ListStore>({
    lists: {
      example: {
        name: 'example',
        rounds: 3,
        requireUnique: false,
        categories: [
          { name: 'High Excerpts', excerpts: 'Alpine\nZarathustra', numRequired: 1 },
          { name: 'Low Excerpts', excerpts: 'Carmen\nHeldenleben', numRequired: 1 },
          {
            name: 'General Excerpts',
            excerpts: 'Pictures\nPetrushka\nLeonore',
            numRequired: 3,
          },
        ],
      },
    },
    selected: 'example',
  });

  const setLists = (data: ListStore) => {
    if (window.electron.store) {
      console.log('setting data in electron store', data);
      window.electron.store.set('excerpts', data);
    } else {
      localStorage.setItem('excerpts', JSON.stringify(data));
    }
    setExcerptLists(data);
  };

  useEffect(() => {
    if (isElectron()) {
      const data = window.electron.store.get('excerpts');
      if (data) setExcerptLists(data);
    } else {
      const data = localStorage.getItem('excerpts');
      if (data) setExcerptLists(JSON.parse(data));
    }
  }, []);

  return (
    <Excerpts.Provider value={{ excerptLists, setLists }}>{children}</Excerpts.Provider>
  );
};
