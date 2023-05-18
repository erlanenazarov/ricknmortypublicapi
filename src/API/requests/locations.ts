import { gql } from 'graphql-request';

export const getList = gql`
  query ($page: Int, $filters: FilterLocation) {
    locations(page: $page, filter: $filters) {
      info {
        count
      }
      results {
        id
        name
        type
        dimension
        created
      }
    }
  }
`;

export const getCount = gql`
  query {
    locations(page: 1) {
      info {
        count
      }
    }
  }
`;

export const getDetail = gql`
  query ($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      created
      residents {
        id
        name
        image
        status
        species
        type
        gender
      }
    }
  }
`;
