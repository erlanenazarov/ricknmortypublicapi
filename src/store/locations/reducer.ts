import { List } from 'immutable';

import { createReducer } from 'utils/createReducer';
import { createImmutableRecord } from 'utils/createImmutableRecord';

import {
  TLocationState,
  TLocationStateHandler,
  ISuccessLocationPayload,
  IRequestLocationDetailPayload,
} from './types';
import { LIST_LOCATIONS, LOCATION_DETAIL } from './actions';
import { initialState } from './initialState';

const setListLocationsLoading =
  (value: boolean): TLocationStateHandler =>
  state =>
    state.setIn(['list', 'fetching'], value);

const setListLocationsData: TLocationStateHandler<ISuccessLocationPayload> = (
  state,
  action,
) => {
  const { count, results } = action.payload;

  return state
    .setIn(['list', 'data', 'count'], count)
    .setIn(['list', 'data', 'results'], List(results));
};

const setDetailLoading =
  (value: boolean): TLocationStateHandler =>
  state =>
    state.setIn(['detail', 'fetching'], value);

const setDetailData: TLocationStateHandler<IRequestLocationDetailPayload> = (
  state,
  action,
) => state.setIn(['detail', 'data'], createImmutableRecord(action.payload));

export default createReducer<TLocationState>(initialState, {
  [LIST_LOCATIONS.request]: setListLocationsLoading(true),
  [LIST_LOCATIONS.success]: [
    setListLocationsLoading(false),
    setListLocationsData,
  ],
  [LIST_LOCATIONS.failure]: setListLocationsLoading(false),
  [LOCATION_DETAIL.request]: setDetailLoading(true),
  [LOCATION_DETAIL.success]: [setDetailLoading(false), setDetailData],
  [LOCATION_DETAIL.failure]: setListLocationsLoading(false),
});
