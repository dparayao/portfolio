import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

// creates a client from our API URL. this client will be used to make requests to our keystone graphQL API

const isWebKit = () => {
  return typeof navigator !== 'undefined' && 
         navigator.userAgent.includes('Safari') && 
         !navigator.userAgent.includes('Chrome');
};

const enchancedFetch = (url, init) => {
  const startTime = performance.now();
  
  return fetch(url, {
    ...init,
    headers: {
      ...init.headers,
      'Access-Control-Allow-Origin': '*',
      // Add WebKit-specific headers
      ...(isWebKit() && {
        'Cache-Control': 'max-age=300',
      })
    },
  }).then(response => {
    const endTime = performance.now();
    console.log(`🚀 ${isWebKit() ? 'WebKit' : 'Blink'} GraphQL: ${(endTime - startTime).toFixed(2)}ms`);
    return response;
  });
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