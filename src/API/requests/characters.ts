import { gql } from 'graphql-request';

export const getList = gql`
  query ($page: Int, $filters: FilterCharacter) {
    characters(page: $page, filter: $filters) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        created
        location {
          id
          name
          type
          dimension
        }
      }
    }
  }
`;

export const getDetail = gql`
  query ($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      created
      location {
        ...locationFields
      }
      origin {
        ...locationFields
      }
      episode {
        id
        name
        air_date
        episode
        created
      }
    }
  }

  fragment locationFields on Location {
    id
    name
    type
    dimension
  }
`;
