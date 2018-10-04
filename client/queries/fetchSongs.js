// This is module that is going to help us writing our
// GraphQL queries
import gql from 'graphql-tag';

// This is the GraphQL query that is going to fetch all
// songs title. Yes, it is a strange syntax
export default gql`
{
  songs {
    id
    title
  }
}
`;