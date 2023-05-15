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
    takeLatest(CHARACTER_DETAIL.request, characterDetail),
  ]);
}

export default Saga;
