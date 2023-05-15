import { List } from 'immutable';

import { createImmutableRecord } from 'utils/createImmutableRecord';

import { IEpisodesState } from './types';

export const initialState = createImmutableRecord<IEpisodesState>({
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
});
