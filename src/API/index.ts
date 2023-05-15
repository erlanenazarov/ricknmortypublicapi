import { BaseGraphQLClient } from './client';

export const client = new BaseGraphQLClient(
  'https://rickandmortyapi.com/graphql',
);

export * as characters from './requests/characters';
export * as locations from './requests/locations';
export * as episodes from './requests/episodes';
