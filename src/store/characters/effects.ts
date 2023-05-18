import { takeLatest, put, call, all } from 'redux-saga/effects';

import { client, characters } from 'API';

import { IPayloadAction } from 'store/types';

import { safeGet } from 'utils/safeGet';

import {
  IListCharactersRequestPayload,
  IGetCharacterRequestPayload,
} from './types';
import {
  LIST_CHARACTERS,
  listCharactersSuccess,
  listCharactersFailure,
  CHARACTER_DETAIL,
  characterDetailSuccess,
  characterDetailFailure,
  CHARACTERS_TOTAL_COUNT,
  charactersTotalCountFailure,
  charactersTotalCountSuccess,
} from './actions';

function* listCharacters(
  action: IPayloadAction<IListCharactersRequestPayload>,
) {
  const { page, filters } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      characters.getList,
      { page, filters },
    );

    yield put(
      listCharactersSuccess({
        count: safeGet(response, 'characters.info.count', 0),
        data: safeGet(response, 'characters.results', []),
      }),
    );
  } catch (error) {
    yield put(listCharactersFailure(error));
  }
}

function* charactersTotalCount() {
  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      characters.getCount,
    );

    yield put(
      charactersTotalCountSuccess(
        safeGet(response, 'characters.info.count', 0),
      ),
    );
  } catch (error) {
    yield put(charactersTotalCountFailure(error));
  }
}

function* characterDetail(action: IPayloadAction<IGetCharacterRequestPayload>) {
  const { id } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      characters.getDetail,
      { id },
    );

    yield put(characterDetailSuccess(safeGet(response, 'character')));
  } catch (error) {
    yield put(characterDetailFailure(error));
  }
}

function* Saga() {
  yield all([
    takeLatest(LIST_CHARACTERS.request, listCharacters),
    takeLatest(CHARACTERS_TOTAL_COUNT.request, charactersTotalCount),
    takeLatest(CHARACTER_DETAIL.request, characterDetail),
  ]);
}

export default Saga;
