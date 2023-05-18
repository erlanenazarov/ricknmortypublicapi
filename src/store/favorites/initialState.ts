import { List } from 'immutable';

import { LOCAL_STORAGE_KEY } from 'configuration/favorites';

import { createImmutableRecord } from 'utils/createImmutableRecord';

import { TFavoritesState } from './types';

const loadCachedFavorites = (): string[] => {
  if (typeof localStorage === 'undefined') return [];
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedData) return [];
  try {
    return JSON.parse(storedData) as string[];
  } catch (error) {
    console.error("Couldn't parse favorites from localStorage!", {
      storedData,
      error,
    });
    return [];
  }
};

export const initialState: TFavoritesState = createImmutableRecord({
  cached: List(loadCachedFavorites()),
  fetched: createImmutableRecord({
    fetching: false,
    data: List([]),
    error: null,
  }),
});
