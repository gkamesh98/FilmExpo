import React from 'react'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";

import App from './src/App';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          allFilms: relayStylePagination()
        },
      },
    },
  })
});

export default function AppRoot() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}
