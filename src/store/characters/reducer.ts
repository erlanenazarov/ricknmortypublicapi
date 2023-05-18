import { List } from 'immutable';

import { createImmutableRecord } from 'utils/createImmutableRecord';
import { createReducer } from 'utils/createReducer';

import {
  TCharactersState,
  TCharactersStateHandler,
  IListCharactersSuccessPayload,
  ICharacterExpanded,
  ICharacter,
} from './types';
import {
  LIST_CHARACTERS,
  CHARACTER_DETAIL,
  CHARACTER_DETAIL_CLEAR,
  LIST_CHARACTERS_CLEAR,
  UPDATE_CHARACTER_DETAIL,
  CHARACTERS_TOTAL_COUNT,
} from './actions';
import { initialState } from './initialState';

const setListCharactersData: TCharactersStateHandler<
  IListCharactersSuccessPayload
> = (state, action) => {
  const { count, data } = action.payload;

  return state
    .setIn(['list', 'data', 'count'], count)
    .setIn(['list', 'data', 'results'], List(data));
};

const setListCharactersLoading =
  (value: boolean): TCharactersStateHandler =>
  state =>
    state.setIn(['list', 'fetching'], value);

const clearListCharacterState: TCharactersStateHandler = state =>
  state
    .setIn(['list', 'data', 'count'], 0)
    .setIn(['list', 'data', 'results'], List([]))
    .setIn(['list', 'error'], null);

const setCharacterDetailLoading =
  (value: boolean): TCharactersStateHandler =>
  state =>
    state.setIn(['detail', 'fetching'], value);

const setCharacterDetailData: TCharactersStateHandler<ICharacterExpanded> = (
  state,
  action,
) => state.setIn(['detail', 'data'], createImmutableRecord(action.payload));

const clearCharacterDetailState: TCharactersStateHandler = state =>
  state.setIn(['detail', 'data'], null).setIn(['detail', 'error'], null);

const updateCharacterDetail: TCharactersStateHandler<Partial<ICharacter>> = (
  state,
  action,
) =>
  Object.entries(action.payload).reduce(
    (memo: TCharactersState, [key, value]): TCharactersState =>
      memo.setIn(['detail', 'data', key], value),
    state,
  );

const setCharactersTotalCountLoading =
  (value: boolean): TCharactersStateHandler =>
  state =>
    state.setIn(['totalCount', 'fetching'], value);

const setCharactersTotalCountData: TCharactersStateHandler<number> = (
  state,
  action,
) => state.setIn(['totalCount', 'data'], action.payload);

export default createReducer<TCharactersState>(initialState, {
  [LIST_CHARACTERS.request]: setListCharactersLoading(true),
  [LIST_CHARACTERS.success]: [
    setListCharactersLoading(false),
    setListCharactersData,
  ],
  [LIST_CHARACTERS.failure]: setListCharactersLoading(false),
  [CHARACTER_DETAIL.request]: setCharacterDetailLoading(true),
  [CHARACTER_DETAIL.success]: [
    setCharacterDetailLoading(false),
    setCharacterDetailData,
  ],
  [CHARACTER_DETAIL.failure]: setCharacterDetailLoading(false),
  [CHARACTER_DETAIL_CLEAR]: clearCharacterDetailState,
  [LIST_CHARACTERS_CLEAR]: clearListCharacterState,
  [UPDATE_CHARACTER_DETAIL]: updateCharacterDetail,
  [CHARACTERS_TOTAL_COUNT.request]: setCharactersTotalCountLoading(true),
  [CHARACTERS_TOTAL_COUNT.success]: [
    setCharactersTotalCountLoading(false),
    setCharactersTotalCountData,
  ],
  [CHARACTERS_TOTAL_COUNT.failure]: setCharactersTotalCountLoading(false),
});
