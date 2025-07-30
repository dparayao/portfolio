import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// creates a client from our API URL. this client will be used to make requests to our keystone graphQL API

const enchancedFetch = (url, init) => {
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Access-Control-Allow-Origin': '*',
    },
  }).then(response => response);
};
const httpLink = new createHttpLink({
  uri: "http://localhost:3000/api/graphql",
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  },
  fetch: enchancedFetch,
});
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});
export default client;