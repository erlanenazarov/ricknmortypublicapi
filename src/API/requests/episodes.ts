import { gql } from 'graphql-request';

export const getList = gql`
  query ($page: Int, $filters: FilterEpisode) {
    episodes(page: $page, filter: $filters) {
      info {
        count
      }
      results {
        id
        name
        air_date
        episode
        created
      }
    }
  }
`;

export const getCount = gql`
  query {
    episodes(page: 1) {
      info {
        count
      }
    }
  }
`;

export const getDetail = gql`
  query ($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      created
      characters {
        id
        name
        image
        gender
        species
        status
        type
        created
      }
    }
  }
`;
