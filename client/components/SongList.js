import React, { Component } from 'react';

// This is module that is going to help us writing our
// GraphQL queries
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

class SongList extends Component {
  renderSongs () {
    return this.props.data.songs.map(song => (
      <li key={song.id} className="collection-item">
        {song.title}
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

// This is the GraphQL query that is going to fetch all
// songs title. Yes, it is a strange syntax
const songsTitleQuery = gql`
  {
    songs {
      id
      title
    }
  }
`;

// The query is executed as soon as our component is first
// rendered. When the query is done, the component will be
// rerendered, and the query results will be stored on the
// "" prop
export default graphql(songsTitleQuery)(SongList);