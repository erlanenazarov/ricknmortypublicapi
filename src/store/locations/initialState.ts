import { List } from 'immutable';

import { createImmutableRecord } from 'utils/createImmutableRecord';

import { ILocationState } from './types';

export const initialState = createImmutableRecord<ILocationState>({
  list: createImmutableRecord({
    fetching: false,
    data: createImmutableRecord({
      count: 0,
      results: List([]),
    }),
    error: null,
  }),
  detail: createImmutableRecord({
    fetching: false,
    data: null,
    error: null,
  }),
  totalCount: createImmutableRecord({
    fetching: false,
    data: 0,
    error: null,
  }),
});
