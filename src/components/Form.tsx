import React, { useState, useContext } from 'react';

import { Excerpts } from '../context';
import { ExcerptList } from '../types';

import styles from './Form.module.scss';

export default function Form() {
  const { excerptLists, setLists } = useContext(Excerpts);
  const defaultList = excerptLists.lists[excerptLists.selected];
  const [formState, setFormState] = useState(defaultList);

  const submit = (updatedList: ExcerptList) => {
    const newState = { ...excerptLists, selected: updatedList.name };
    newState.lists[updatedList.name] = updatedList;
    setLists(newState);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleCategoryChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedCategories = [...formState.categories];
    if (e.target.name === 'excerpts') {
      updatedCategories[index].excerpts = e.target.value;
    } else if (e.target.name == 'name') {
      updatedCategories[index].name = e.target.value;
    } else if (e.target.name == 'numRequired') {
      updatedCategories[index].numRequired = parseInt(e.target.value);
    }
    setFormState({ ...formState, categories: updatedCategories });
  };
  const addCategory = () => {
    setFormState({
      ...formState,
      categories: [...formState.categories, { name: '', excerpts: '', numRequired: 1 }],
    });
  };

  const removeCategory = (index: number) => {
    const updatedCategories = [...formState.categories];
    updatedCategories.splice(index, 1);
    setFormState({ ...formState, categories: updatedCategories });
  };

  return (
    <>
      <h2 style={{ marginBottom: '1px' }}>Configuration</h2>
      <p style={{ fontSize: '13px', paddingTop: '1px', marginTop: '1px' }}>
        &nbsp;&nbsp;&nbsp;To make a new list, just rename the current list and hit
        Generate.
      </p>

      <form>
        <div>
          <label htmlFor="name">List:&nbsp;</label>
          <input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            placeholder="List Name"
          />
        </div>

        <div>
          <label htmlFor="rounds">Rounds:&nbsp;</label>
          <input
            type="number"
            name="rounds"
            value={formState.rounds}
            onChange={handleInputChange}
            placeholder="Number of Rounds"
          />
        </div>

        <div>
          <input
            type="checkbox"
            name="requireUnique"
            checked={formState.requireUnique}
            onChange={handleInputChange}
          />
          <label htmlFor="requireUnique">&nbsp;No repeats across rounds?</label>
        </div>

        <h3 style={{ margin: '1rem 0' }}>Excerpts</h3>
        <div style={{ marginBottom: '1rem' }}>
          <button type="button" onClick={addCategory}>
            Add New Excerpt Category
          </button>
        </div>

        <div className={styles.categories}>
          {formState.categories.map((category, index) => (
            <div key={index} className={styles.category}>
              <div className={styles.catItem}>
                <label className={styles.label} htmlFor="catName">
                  Name:&nbsp;
                </label>
                <input
                  type="text"
                  name="catName"
                  value={category.name}
                  onChange={(e) => handleCategoryChange(index, e)}
                  placeholder="Category Name"
                  className={styles.input}
                />
              </div>

              <div className={styles.catItem}>
                <label className={styles.label} htmlFor="excerpts">
                  Excerpts:&nbsp;
                </label>
                <textarea
                  name="excerpts"
                  value={category.excerpts}
                  onChange={(e) => handleCategoryChange(index, e)}
                  placeholder="Excerpts"
                  className={styles.input}
                  style={{ minWidth: '170px', minHeight: '50px' }}
                />
              </div>

              <div className={styles.catItem}>
                <label className={styles.label} htmlFor="number Required">
                  # Required:&nbsp;
                </label>
                <input
                  type="number"
                  name="number Required"
                  value={category.numRequired}
                  onChange={(e) => handleCategoryChange(index, e)}
                  placeholder="Number Required"
                  className={styles.input}
                />
              </div>

              <button type="button" onClick={() => removeCategory(index)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <button type="button" onClick={() => submit(formState)}>
          Generate List
        </button>
      </form>
    </>
  );
}
