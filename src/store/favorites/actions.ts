import { ICharacter } from 'store/characters/types';

import { createAction, populateRequestActions } from 'utils/createAction';

const STATE_KEY = '@favorites';

export const ADD_FAVORITE = `${STATE_KEY}/ADD_FAVORITE`;
export const REMOVE_FROM_FAVORITE = `${STATE_KEY}/REMOVE_FROM_FAVORITE`;
export const FETCH_FAVORITES = populateRequestActions(
  STATE_KEY,
  'FETCH_FAVORITES',
);
export const CLEAR_FETCHED_FAVORITES = `${STATE_KEY}/CLEAR_FETCHED_FAVORITES`;

export const addFavorite = createAction<string>(ADD_FAVORITE);
export const removeFromFavorite = createAction<string>(REMOVE_FROM_FAVORITE);

export const fetchFavoritesRequest = createAction(FETCH_FAVORITES.request);
export const fetchFavoritesSuccess = createAction<ICharacter[]>(
  FETCH_FAVORITES.success,
);
export const fetchFavoritesFailure = createAction<unknown>(
  FETCH_FAVORITES.failure,
);
export const clearFetchedFavorites = createAction(CLEAR_FETCHED_FAVORITES);
