import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {ApolloClient, ApolloLink, ApolloProvider, from, HttpLink, InMemoryCache} from '@apollo/client'
import {getAccessToken, setAccessToken} from './accessToken'
import {TokenRefreshLink} from 'apollo-link-token-refresh'
import jwtDecode, {JwtPayload} from 'jwt-decode'

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql', credentials: 'include'
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const accessToken = getAccessToken()
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `bearer ${accessToken}` : ''
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([
    new TokenRefreshLink({
      accessTokenField: 'accessToken',
      isTokenValidOrUndefined() {
        const token = getAccessToken()

        if (!token) {
          return true
        }

        try {
          const {exp} = jwtDecode<JwtPayload>(token)
          return Date.now() < exp! * 1000;
        } catch {
          return false
        }
      },
      fetchAccessToken() {
        return fetch('http://localhost:4000/refresh_token', {method: 'POST', credentials: 'include'})
      },
      handleFetch(accessToken) {
        setAccessToken(accessToken);
      },
      handleError(err) {
        // full control over handling token fetch Error
        console.warn('Your refresh token is invalid. Try to relogin');
        console.error(err);
      }
    }),
    authMiddleware,
    httpLink
  ]),
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
