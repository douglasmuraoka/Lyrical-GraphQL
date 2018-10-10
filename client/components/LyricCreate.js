import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * Component that creates a Lyric which is associated
 * with a Song. It should invoke a mutation in order
 * to do the creation on the server-side.
 */
class LyricCreate extends Component {
  constructor (props) {
    super(props);

    this.state = { content: ''};
  }

  onSubmit (event) {
    event.preventDefault();

    // This is where we invoke the "AddLyricToSong" mutation,
    // providing the variables it needs
    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId
      }
    });
    // After submitting, clears the content from the input
    this.setState({ content: '' });
  }

  render () {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input onChange={event => this.setState({ content: event.target.value })} value={this.state.content}/>
      </form>
    );
  }
}

// Defines the "AddLyricToSong" mutation, which receives
// "content" and "songId" as parameters. It will then
// invoke the "addLyricToSong" mutation, which will create
// the lyric.
const mutation = gql`
  mutation AddLyricToSong ($content: String, $songId: ID) {
    addLyricToSong (content: $content, songId: $songId) {
      id,
      lyrics {
        content
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);