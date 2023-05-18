import { List } from 'immutable';

import { createReducer } from 'utils/createReducer';
import { createImmutableRecord } from 'utils/createImmutableRecord';

import {
  TLocationState,
  TLocationStateHandler,
  ISuccessLocationPayload,
  IRequestLocationDetailPayload,
} from './types';
import {
  LIST_LOCATIONS,
  LOCATION_DETAIL,
  LOCATIONS_TOTAL_COUNT,
  CLEAR_LIST_LOCATIONS,
  CLEAR_LOCATION_DETAIL,
} from './actions';
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

const setLocationsTotalCountLoading =
  (value: boolean): TLocationStateHandler =>
  state =>
    state.setIn(['totalCount', 'fetching'], value);

const setLocationsTotalCountData: TLocationStateHandler<number> = (
  state,
  action,
) => state.setIn(['totalCount', 'data'], action.payload);

const clearListLocations: TLocationStateHandler = state =>
  state
    .setIn(['list', 'data', 'count'], 0)
    .setIn(['list', 'data', 'results'], List([]))
    .setIn(['list', 'error'], null);

const clearLocationDetail: TLocationStateHandler = state =>
  state.setIn(['detail', 'data'], null).setIn(['detail', 'error'], null);

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
  [LOCATIONS_TOTAL_COUNT.request]: setLocationsTotalCountLoading(true),
  [LOCATIONS_TOTAL_COUNT.success]: [
    setLocationsTotalCountLoading(false),
    setLocationsTotalCountData,
  ],
  [LOCATIONS_TOTAL_COUNT.failure]: setLocationsTotalCountLoading(false),
  [CLEAR_LIST_LOCATIONS]: clearListLocations,
  [CLEAR_LOCATION_DETAIL]: clearLocationDetail,
});
