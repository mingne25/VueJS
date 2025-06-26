// src/apollo/apollo.js
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';

const GRAPHQL_URL = process.env.VUE_APP_GRAPHQL_URL || 'https://graphqlzero.almansi.me/api';

const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: { errorPolicy: 'all' },
    mutate: { errorPolicy: 'all' },
  },
});

export default apolloClient;