// This is module that is going to help us writing our
// GraphQL queries
import gql from 'graphql-tag';

// This is the GraphQL query that is going to fetch
// song details, given a specific id
export default gql`
query SongQuery ($id: ID!) {
  song (id: $id) {
    id
    title
    lyrics {
      id
      content
    }
  }
}
`;