import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * Component that renders a list of lyrics.
 * Just a regular React component.
 */
class LyricList extends Component {
  onLike (id, likes) {
    this.props.mutate({
      variables: {
        id
      },
      // Updates the UI before the mutation is completed.
      // Used to avoid the request delay on the front-end :)
      // This is the response expected, and it is used on
      // the front-end while the request is still pending
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics () {
    return this.props.lyrics.map(
      ({ id, content, likes }) => {
        return (
          <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
              <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
              {likes}
            </div>
          </li>
        );
      }
    );
  }

  render () {
    return (
      <ul className="collection">
        { this.renderLyrics() }
      </ul>
    );
  }
}

const mutation = gql`
mutation LikeLyric($id: ID) {
  likeLyric (id: $id) {
    id
    likes
  }
}
`;

export default graphql(mutation)(LyricList);