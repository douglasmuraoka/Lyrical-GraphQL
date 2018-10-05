import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import { Link } from 'react-router';
import fetchSongsQuery from '../queries/fetchSongs';
import gql from 'graphql-tag';

class SongList extends Component {
  onSongDelete (id) {
    this.props.mutate({
      variables: {
        id
      }
    }).then(() => {
      // "refetch" is provided by Apollo for refetching
      // all queries from THIS component. It is an alternative
      // for "refetchQueries" when we need to refetch the
      // initial queries of an updated component.
      // In this case, we will execute the "fetchSongsQuery"
      // and update our view with the updated data.
      this.props.data.refetch()
    });
  }

  renderSongs () {
    return this.props.data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        {title}
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>delete</i>
      </li>
    ));
  }

  render () {
    // The "loading" indicates the GraphQL query is not yet done
    if (this.props.data.loading) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <ul className="collection">
          {this.renderSongs()}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

// This is the mutation that will invoke the "deleteSong"
// mutation, defined on our schema, and will delete the
// song, given its ID.
const mutation = gql`
mutation DeleteSong ($id: ID) {
  deleteSong(id: $id) {
    id
  }
}
`;

// The query is executed as soon as our component is first
// rendered. When the query is done, the component will be
// rerendered, and the query results will be stored on the
// "" prop
export default graphql(mutation)(
  graphql(fetchSongsQuery)(SongList)
);