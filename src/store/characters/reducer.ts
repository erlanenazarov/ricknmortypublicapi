import { List } from 'immutable';

import { createImmutableRecord } from 'utils/createImmutableRecord';
import { createReducer } from 'utils/createReducer';

import {
  TCharactersState,
  TCharactersStateHandler,
  IListCharactersSuccessPayload,
  ICharacterExpanded,
} from './types';
import {
  LIST_CHARACTERS,
  CHARACTER_DETAIL,
  CHARACTER_DETAIL_CLEAR,
  LIST_CHARACTERS_CLEAR,
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
});
