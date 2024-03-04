import React, { useContext } from 'react';

import { Excerpts } from '../context';

export default function Lists() {
  const { excerptLists, setLists } = useContext(Excerpts);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLists({ ...excerptLists, selected: e.target.value });
  };
  const deleteList = (name: string) => {
    const confirm = window.confirm('Are you sure you want to delete this list?');
    if (confirm) {
      const updatedLists = { ...excerptLists };
      delete updatedLists.lists[name];
      for (const list in updatedLists.lists) {
        updatedLists.selected = list;
        break;
      }
      setLists(updatedLists);
    }
  };
  return (
    <div>
      <h2>Select a List</h2>
      {Object.keys(excerptLists.lists).map((listName) => (
        <div key={listName}>
          <label>
            <input
              type="radio"
              id={listName}
              name="list"
              value={listName}
              checked={listName === excerptLists.selected}
              onChange={onChange}
            />
            {listName}
          </label>
          <label>
            <button
              type="button"
              id={`${listName}_delete`}
              name="del_list"
              onClick={() => deleteList(listName)}
            >
              Delete List
            </button>
            {listName}
          </label>
        </div>
      ))}
    </div>
  );
}
