import React from 'react';

import {Provider} from 'react-redux';
import {store} from './src/store';

import MainPage from './src/pages/MainPage';

const App = () => {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
};

export default App;
