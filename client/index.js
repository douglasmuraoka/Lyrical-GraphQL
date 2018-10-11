import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import SongList from './components/SongList';
import App from './components/App';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

// The ApolloProvider is the component that will be communicating
// with the GraphQL server to provide data to React
import { ApolloProvider } from 'react-apollo';

// Empty configuration assumes the GraphQL server is set up on
// /graphql route
const client = new ApolloClient({
  // This is the function used to identify every single piece of
  // data fetched from the GraphQL server.
  // It is used to automatically update any entry whenever it
  // is changed by any mutation.
  // When using this function, we must assure to ask
  // for the id, otherwise Apollo won't know how to identify
  // the entry fetched.
  dataIdFromObject: obj => obj.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
          <Route path="songs/:id" component={SongDetail} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
