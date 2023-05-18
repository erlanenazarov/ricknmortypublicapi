import { List, RecordOf } from 'immutable';
import { createSelector } from 'reselect';

import { IAppState } from 'store/types';

import { extractValueFromState } from 'utils/extractValueFromState';

import {
  TLocationState,
  TLocationStateSelectorReturnType,
  ILocation,
  ILocationExpanded,
} from './types';

const selectState = (state: IAppState): TLocationState => state.locations;

export const makeSelectLocationListLoading: TLocationStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'fetching'], false),
  );

export const makeSelectLocationsListCount: TLocationStateSelectorReturnType<number> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'data', 'count'], 0),
  );

export const makeSelectLocationsListData: TLocationStateSelectorReturnType<
  ILocation[]
> = createSelector(selectState, (state: TLocationState): ILocation[] => {
  const rawValue = state.getIn(['list', 'data', 'results']);
  if (!rawValue) return [];
  const value = rawValue as List<ILocation>;
  return value.toJS() as ILocation[];
});

export const makeSelectLocationDetailLoading: TLocationStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['detail', 'fetching'], false),
  );

export const makeSelectLocationDetailData: TLocationStateSelectorReturnType<ILocationExpanded | null> =
  createSelector(
    selectState,
    (state: TLocationState): ILocationExpanded | null => {
      const rawValue = state.getIn(['detail', 'data']);
      if (!rawValue) return null;
      const value = rawValue as RecordOf<ILocationExpanded>;
      return value.toJS() as ILocationExpanded;
    },
  );

export const makeSelectLocationsTotalCountLoading: TLocationStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['totalCount', 'fetching'], false),
  );

export const makeSelectLocationsTotalCountData: TLocationStateSelectorReturnType<number> =
  createSelector(selectState, extractValueFromState(['totalCount', 'data'], 0));
