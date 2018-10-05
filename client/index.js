import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';

// The ApolloProvider is the component that will be communicating
// with the GraphQL server to provide data to React
import { ApolloProvider } from 'react-apollo';

// Empty configuration assumes the GraphQL server is set up on
// /graphql route
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
