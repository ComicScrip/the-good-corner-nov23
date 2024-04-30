import gql from "graphql-tag";

export default gql`
  query Tags {
    tags {
      id
      name
    }
  }
`;
