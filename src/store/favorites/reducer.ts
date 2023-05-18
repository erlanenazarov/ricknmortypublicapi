import { List } from 'immutable';

import { ICharacter } from 'store/characters/types';

import { createReducer } from 'utils/createReducer';

import { initialState } from './initialState';
import { TFavoritesState, TFavoritesStateHandler } from './types';
import {
  ADD_FAVORITE,
  REMOVE_FROM_FAVORITE,
  FETCH_FAVORITES,
  CLEAR_FETCHED_FAVORITES,
} from './actions';

const addFavorite: TFavoritesStateHandler<string> = (state, action) => {
  if (state.get('cached').includes(action.payload)) return state;
  return state.update('cached', prev => prev.push(action.payload));
};

const removeFromFavorite: TFavoritesStateHandler<string> = (state, action) => {
  if (!state.get('cached').includes(action.payload)) return state;
  return state.update('cached', prev =>
    prev.filter(item => item !== action.payload),
  );
};

const setFavoritesLoading =
  (value: boolean): TFavoritesStateHandler =>
  state =>
    state.setIn(['fetched', 'fetching'], value);

const setFavoritesData: TFavoritesStateHandler<ICharacter[]> = (
  state,
  action,
) => state.setIn(['fetched', 'data'], List(action.payload));

const clearFetchedFavorites: TFavoritesStateHandler = state =>
  state.setIn(['fetched', 'data'], List([])).setIn(['fetched', 'error'], null);

export default createReducer<TFavoritesState>(initialState, {
  [ADD_FAVORITE]: addFavorite,
  [REMOVE_FROM_FAVORITE]: removeFromFavorite,
  [FETCH_FAVORITES.request]: setFavoritesLoading(true),
  [FETCH_FAVORITES.success]: [setFavoritesLoading(false), setFavoritesData],
  [FETCH_FAVORITES.failure]: setFavoritesLoading(false),
  [CLEAR_FETCHED_FAVORITES]: clearFetchedFavorites,
});
