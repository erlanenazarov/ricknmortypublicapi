import { List, RecordOf } from 'immutable';
import { createSelector } from 'reselect';

import { IAppState } from 'store/types';

import { extractValueFromState } from 'utils/extractValueFromState';

import {
  TCharactersState,
  TCharactersSelectorReturnType,
  ICharacter,
  ICharacterExpanded,
} from './types';

const selectState = (state: IAppState): TCharactersState => state.characters;

export const makeSelectCharactersLoading: TCharactersSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'fetching'], false),
  );

export const makeSelectCharactersCount: TCharactersSelectorReturnType<number> =
  createSelector(
    selectState,
    extractValueFromState(['list', 'data', 'count'], 0),
  );

export const makeSelectCharactersData: TCharactersSelectorReturnType<
  ICharacter[]
> = createSelector(selectState, (state: TCharactersState): ICharacter[] => {
  const rawValue = state.getIn(['list', 'data', 'results']);
  if (!rawValue) return [];
  const value = rawValue as List<ICharacter>;
  return value.toJS() as ICharacter[];
});

export const makeSelectCharacterDetailLoading: TCharactersSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['detail', 'fetching'], false),
  );

export const makeSelectCharacterDetailData: TCharactersSelectorReturnType<ICharacterExpanded | null> =
  createSelector(
    selectState,
    (state: TCharactersState): ICharacterExpanded | null => {
      const rawValue = state.getIn(['detail', 'data']);
      if (!rawValue) return null;
      const value = rawValue as RecordOf<ICharacterExpanded>;
      return value.toJS() as ICharacterExpanded;
    },
  );

export const makeSelectCharactersTotalCountLoading: TCharactersSelectorReturnType<boolean> =
  createSelector(
    selectState,
    extractValueFromState(['totalCount', 'fetching'], false),
  );

export const makeSelectCharactersTotalCountData: TCharactersSelectorReturnType<number> =
  createSelector(selectState, extractValueFromState(['totalCount', 'data'], 0));
