import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import fetchSong from '../queries/fetchSong';
import { Link } from 'react-router';
import LyricCreate from './LyricCreate';

/**
 * Component responsible for rendering the details
 * of a song.
 * It should execute the `fetchSong` query, whose
 * parameters should be provided by the react-router
 * Route.
 */
class SongDetail extends Component {
  render () {
    const { song } = this.props.data;
    if (!song) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <div>
          <Link to="/">Back</Link>
          <h3>{song.title}</h3>
          <LyricCreate songId={song.id} />
      </div>
    );
  }
}

// This is how we provide variables for the `fetchSong`
// query. "props.params.id" is set by the react-router
// Route.
export default graphql(fetchSong, {
  options: props => {
    return {
      variables: {
        id: props.params.id
      }
    };
  }
})(SongDetail);