import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-memory';
import { HttpLink } from 'apollo-link-http';
import { gql } from 'graphql-tag';

import './index.css';
import App from './App';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:4000'
});
const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
