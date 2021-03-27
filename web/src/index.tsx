import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client'
import {getAccessToken} from "./accessToken";
import {setContext} from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
})

const authLink = setContext((_, { headers }) => {
  const accessToken = getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : ''
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: authLink.concat(httpLink)
  // request: (operation) => {
  //   operation.setContext({
  //     header: {
  //       authorization: accessToken ? `bearer ${accessToken}` : ''
  //     }
  //   })
  // }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes/>
  </ApolloProvider>,
  document.getElementById('root')
);
