import { all, put, call, takeLatest } from 'redux-saga/effects';
import { client, episodes } from 'API';

import { IPayloadAction } from 'store/types';

import { safeGet } from 'utils/safeGet';

import {
  IRequestEpisodesListPayload,
  IEpisodeDetailRequestPayload,
} from './types';
import {
  LIST_EPISODES,
  EPISODE_DETAIL,
  listEpisodesFailure,
  listEpisodesSuccess,
  episodeDetailFailure,
  episodeDetailSuccess,
} from './actions';

function* listEpisodes(action: IPayloadAction<IRequestEpisodesListPayload>) {
  const { page, filters } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      episodes.getList,
      { page, filters },
    );

    yield put(
      listEpisodesSuccess({
        count: safeGet(response, 'episodes.info.count', 0),
        results: safeGet(response, 'episodes.results', []),
      }),
    );
  } catch (error) {
    yield put(listEpisodesFailure());
  }
}

function* episodeDetail(action: IPayloadAction<IEpisodeDetailRequestPayload>) {
  const { id } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      episodes.getDetail,
      { id },
    );

    yield put(episodeDetailSuccess(safeGet(response, 'episode')));
  } catch (error) {
    yield put(episodeDetailFailure());
  }
}

function* Saga() {
  yield all([
    takeLatest(LIST_EPISODES.request, listEpisodes),
    takeLatest(EPISODE_DETAIL.request, episodeDetail),
  ]);
}

export default Saga;
