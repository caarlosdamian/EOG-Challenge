/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Store } from './redux/store';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import App from './App';
const client = new ApolloClient({
  uri: 'https://react.eogresources.com/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={Store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
