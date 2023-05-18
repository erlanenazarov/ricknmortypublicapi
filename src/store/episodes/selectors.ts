import { List, RecordOf } from 'immutable';
import { createSelector } from 'reselect';

import { IAppState } from 'store/types';

import { extractValueFromState } from 'utils/extractValueFromState';

import {
  TEpisodesState,
  TEpisodesStateSelectorReturnType,
  IEpisode,
  IEpisodeExpanded,
} from './types';

const selectState = (state: IAppState): TEpisodesState => state.episodes;

export const makeSelectListEpisodesLoading: TEpisodesStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'fetching'], false),
  );

export const makeSelectListEpisodesCount: TEpisodesStateSelectorReturnType<number> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'data', 'count'], 0),
  );

export const makeSelectListEpisodesData: TEpisodesStateSelectorReturnType<
  IEpisode[]
> = createSelector(selectState, (state: TEpisodesState): IEpisode[] => {
  const rawValue = state.getIn(['list', 'data', 'results']);
  if (!rawValue) return [];
  const value = rawValue as List<IEpisode>;
  return value.toJS() as IEpisode[];
});

export const makeSelectEpisodeDetailLoading: TEpisodesStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['detail', 'fetching'], false),
  );

export const makeSelectEpisodeDetailData: TEpisodesStateSelectorReturnType<IEpisodeExpanded | null> =
  createSelector(
    selectState,
    (state: TEpisodesState): IEpisodeExpanded | null => {
      const rawValue = state.getIn(['detail', 'data']);
      if (!rawValue) return null;
      const value = rawValue as RecordOf<IEpisodeExpanded>;
      return value.toJS() as IEpisodeExpanded;
    },
  );

export const makeSelectEpisodesTotalCountLoading: TEpisodesStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['totalCount', 'fetching'], false),
  );

export const makeSelectEpisodesTotalCountData: TEpisodesStateSelectorReturnType<number> =
  createSelector(selectState, extractValueFromState(['totalCount', 'data'], 0));
