import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

/**
 * This is the component responsible for creating
 * new songs, using GraphQL mutations.
 */
class SongCreate extends Component {
  constructor (props) {
    super(props);

    this.state = { title: ''};
  }

  onSubmit (event) {
    event.preventDefault();

    // This is where we can invoke to the "AddSong" mutation, defined
    // below, and where we can set the "$title" variable value
    this.props.mutate({
      variables: {
        title: this.state.title
      }
    });
  }

  render () {
    return (
      <div>
        <h3>Create a new song!</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title} />
        </form>
      </div>
    );
  }
}

// Definition of the "AddSong" mutation (think about this as a
// function), which will invoke the "addSong" mutation on the
// GraphQL server.
// The "$title" is a so called query variable, where we can
// input our data and make this mutation dynamic :)
// The "AddSong" name could be anything, no need for it to be
// equal to the mutation name whatsoever.
const mutation = gql`
mutation AddSong ($title: String) {
  addSong (title: $title) {
    id
    title
  }
}
`;

// Mutations are defined the same way as queries.
// It will give us access to the "this.props.mutate" property,
// which is the mutation function defined in this component
export default graphql(mutation)(SongCreate);