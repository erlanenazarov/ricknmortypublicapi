import { all, takeLatest, put, call } from 'redux-saga/effects';
import { client, locations } from 'API';

import { IPayloadAction } from 'store/types';

import { safeGet } from 'utils/safeGet';

import {
  IRequestLocationDetailPayload,
  IRequestLocationPayload,
} from './types';
import {
  LIST_LOCATIONS,
  listLocationsSuccess,
  listLocationsFailure,
  LOCATION_DETAIL,
  locationDetailFailure,
  locationDetailSuccess,
} from './actions';

function* listLocations(action: IPayloadAction<IRequestLocationPayload>) {
  const { page, filters } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      locations.getList,
      { page, filters },
    );

    yield put(
      listLocationsSuccess({
        count: safeGet(response, 'locations.info.count', 0),
        results: safeGet(response, 'locations.results', []),
      }),
    );
  } catch (error) {
    yield put(listLocationsFailure());
  }
}

function* locationDetail(
  action: IPayloadAction<IRequestLocationDetailPayload>,
) {
  const { id } = action.payload;

  try {
    const response: unknown = yield call(
      client.cancelableRequest,
      locations.getDetail,
      { id },
    );

    yield put(locationDetailSuccess(safeGet(response, 'location')));
  } catch (error) {
    yield put(locationDetailFailure());
  }
}

function* Saga() {
  yield all([
    takeLatest(LIST_LOCATIONS.request, listLocations),
    takeLatest(LOCATION_DETAIL.request, locationDetail),
  ]);
}

export default Saga;
