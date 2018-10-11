import React, { Component } from 'react';

/**
 * Component that renders a list of lyrics.
 * Just a regular React component.
 */
class LyricList extends Component {
  renderLyrics () {
    return this.props.lyrics.map(
      ({ id, content }) => <li key={id} className="collection-item">{content}</li>
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

export default LyricList;