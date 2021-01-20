import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './App';

import store from './redux/store';

ReactDOM.render(
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <App />
    </SnackbarProvider>
  </Provider>,
  document.getElementById('root'),
);
