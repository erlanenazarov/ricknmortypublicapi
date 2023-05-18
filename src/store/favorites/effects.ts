import { all, takeLatest, put, call, select, delay } from 'redux-saga/effects';

import { client, characters } from 'API';

import {
  LOCAL_STORAGE_KEY,
  LOCAL_STORAGE_SAVE_TIME,
} from 'configuration/favorites';

import { safeGet } from 'utils/safeGet';

import {
  ADD_FAVORITE,
  REMOVE_FROM_FAVORITE,
  FETCH_FAVORITES,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
} from './actions';
import { makeSelectCachedFavorites } from './selectors';

function* fetchFavorites() {
  const cached: unknown = yield select(makeSelectCachedFavorites);
  if (!Array.isArray(cached)) {
    yield put(fetchFavoritesFailure('There are no saved favorites'));
    return;
  }

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      characters.getByIds,
      { ids: cached },
    );

    yield put(fetchFavoritesSuccess(safeGet(response, 'charactersByIds', [])));
  } catch (error) {
    yield put(fetchFavoritesFailure(error));
  }
}

function* saveState() {
  yield delay(LOCAL_STORAGE_SAVE_TIME); // Wait until action payload will be in the store.
  const cached: unknown = yield select(makeSelectCachedFavorites);
  if (!Array.isArray(cached)) return;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cached));
}

function* Saga() {
  yield all([
    takeLatest(FETCH_FAVORITES.request, fetchFavorites),
    takeLatest(ADD_FAVORITE, saveState),
    takeLatest(REMOVE_FROM_FAVORITE, saveState),
  ]);
}

export default Saga;
