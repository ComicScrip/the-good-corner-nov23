import gql from "graphql-tag";

export default gql`
  mutation CreateTag($data: NewTagInput!) {
    createTag(data: $data) {
      id
      name
    }
  }
`;
