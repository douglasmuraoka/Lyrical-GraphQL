import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';

// The ApolloProvider is the component that will be communicating
// with the GraphQL server to provide data to React
import { ApolloProvider } from 'react-apollo';

// Empty configuration assumes the GraphQL server is set up on
// /graphql route
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
