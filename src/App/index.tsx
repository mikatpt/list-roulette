import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { createRoot } from 'react-dom/client';

import Form from '../components/Form';
import Display from '../components/Display';
import Lists from '../components/Lists';

import styles from './App.module.scss';
import 'react-tabs/style/react-tabs.css';

import { ExcerptsContextProvider } from '../context';

const root = createRoot(document.getElementById('list-roulette'));

const App = () => {
  return (
    <ExcerptsContextProvider>
      <AppInner />
    </ExcerptsContextProvider>
  );
};

const AppInner = () => {
  return (
    <div className={styles.mainApp}>
      <div className={styles.column} style={{ borderRight: '2px solid #26297f' }}>
        <Tabs>
          <TabList>
            <Tab>Configure</Tab>
            <Tab>Excerpt Lists</Tab>
          </TabList>

          <TabPanel>
            <Form />
          </TabPanel>
          <TabPanel>
            <Lists />
          </TabPanel>
        </Tabs>
      </div>

      <div className={styles.column}>
        <Display />
      </div>
    </div>
  );
};
root.render(<App />);
