import { List } from 'immutable';

import { createReducer } from 'utils/createReducer';
import { createImmutableRecord } from 'utils/createImmutableRecord';

import {
  TEpisodesState,
  TEpisodesStateHandler,
  ISuccessEpisodesListPayload,
  IEpisodeExpanded,
} from './types';
import {
  LIST_EPISODES,
  EPISODE_DETAIL,
  CLEAR_EPISODE_DETAIL,
  CLEAR_LIST_EPISODES,
  EPISODES_TOTAL_COUNT,
} from './actions';
import { initialState } from './initialState';

const setEpisodesListLoading =
  (value: boolean): TEpisodesStateHandler =>
  state =>
    state.setIn(['list', 'fetching'], value);

const setEpisodesListData: TEpisodesStateHandler<
  ISuccessEpisodesListPayload
> = (state, action) => {
  const { count, results } = action.payload;

  return state
    .setIn(['list', 'data', 'count'], count)
    .setIn(['list', 'data', 'results'], List(results));
};

const clearEpisodesListState: TEpisodesStateHandler = state =>
  state
    .setIn(['list', 'data', 'count'], 0)
    .setIn(['list', 'data', 'results'], List([]))
    .setIn(['list', 'error'], null);

const setEpisodeDetailLoading =
  (value: boolean): TEpisodesStateHandler =>
  state =>
    state.setIn(['detail', 'fetching'], value);

const setEpisodeDetailData: TEpisodesStateHandler<IEpisodeExpanded> = (
  state,
  action,
) => state.setIn(['detail', 'data'], createImmutableRecord(action.payload));

const clearEpisodeDetailState: TEpisodesStateHandler = state =>
  state.setIn(['detail', 'data'], null).setIn(['detail', 'error'], null);

const setEpisodesTotalCountLoading =
  (value: boolean): TEpisodesStateHandler =>
  state =>
    state.setIn(['totalCount', 'fetching'], value);

const setEpisodesTotalCountData: TEpisodesStateHandler<number> = (
  state,
  action,
) => state.setIn(['totalCount', 'data'], action.payload);

export default createReducer<TEpisodesState>(initialState, {
  [LIST_EPISODES.request]: setEpisodesListLoading(true),
  [LIST_EPISODES.success]: [setEpisodesListLoading(false), setEpisodesListData],
  [LIST_EPISODES.failure]: setEpisodesListLoading(false),
  [CLEAR_LIST_EPISODES]: clearEpisodesListState,
  [EPISODE_DETAIL.request]: setEpisodeDetailLoading(true),
  [EPISODE_DETAIL.success]: [
    setEpisodeDetailLoading(false),
    setEpisodeDetailData,
  ],
  [EPISODE_DETAIL.failure]: setEpisodeDetailLoading(false),
  [CLEAR_EPISODE_DETAIL]: clearEpisodeDetailState,
  [EPISODES_TOTAL_COUNT.request]: setEpisodesTotalCountLoading(true),
  [EPISODES_TOTAL_COUNT.success]: [
    setEpisodesTotalCountLoading(false),
    setEpisodesTotalCountData,
  ],
  [EPISODES_TOTAL_COUNT.failure]: setEpisodesTotalCountLoading(false),
});
