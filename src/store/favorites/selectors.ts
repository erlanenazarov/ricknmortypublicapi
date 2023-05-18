import { List } from 'immutable';
import { createSelector } from 'reselect';

import { IAppState } from 'store/types';

import { extractValueFromState } from 'utils/extractValueFromState';

import { ICharacter } from '../characters/types';

import { TFavoritesStateSelectorReturnType, TFavoritesState } from './types';

const selectState = (state: IAppState): TFavoritesState => state.favorites;

export const makeSelectCachedFavorites: TFavoritesStateSelectorReturnType<
  string[]
> = createSelector(
  selectState,
  (state: TFavoritesState): string[] => state.get('cached').toJS() as string[],
);

export const makeSelectIsCachedItem = (
  value: string,
): TFavoritesStateSelectorReturnType<boolean> =>
  createSelector(selectState, (state: TFavoritesState): boolean => {
    return state.get('cached').includes(value);
  });

export const makeSelectFetchedFavoritesLoading: TFavoritesStateSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['fetched', 'fetching'], false),
  );

export const makeSelectFetchedFavoritesData: TFavoritesStateSelectorReturnType<
  ICharacter[]
> = createSelector(selectState, (state: TFavoritesState): ICharacter[] => {
  const rawValue = state.getIn(['fetched', 'data']);
  if (!rawValue) return [];
  const value = rawValue as List<ICharacter>;
  return value.toJS() as ICharacter[];
});
