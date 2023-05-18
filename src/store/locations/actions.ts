import { createAction, populateRequestActions } from 'utils/createAction';

import {
  IRequestLocationDetailPayload,
  IRequestLocationPayload,
  ISuccessLocationPayload,
  ILocationExpanded,
} from './types';

const STATE_KEY = '@locations';

export const LIST_LOCATIONS = populateRequestActions(
  STATE_KEY,
  'LIST_LOCATIONS',
);

export const LOCATION_DETAIL = populateRequestActions(
  STATE_KEY,
  'LOCATION_DETAIL',
);

export const LOCATIONS_TOTAL_COUNT = populateRequestActions(
  STATE_KEY,
  'LOCATIONS_TOTAL_COUNT',
);

export const CLEAR_LIST_LOCATIONS = `${STATE_KEY}/CLEAR_LIST_LOCATIONS`;
export const CLEAR_LOCATION_DETAIL = `${STATE_KEY}/CLEAR_LOCATION_DETAIL`;

export const listLocationsRequest = createAction<IRequestLocationPayload>(
  LIST_LOCATIONS.request,
);
export const listLocationsSuccess = createAction<ISuccessLocationPayload>(
  LIST_LOCATIONS.success,
);
export const listLocationsFailure = createAction(LIST_LOCATIONS.failure);

export const locationDetailRequest =
  createAction<IRequestLocationDetailPayload>(LOCATION_DETAIL.request);
export const locationDetailSuccess = createAction<ILocationExpanded>(
  LOCATION_DETAIL.success,
);
export const locationDetailFailure = createAction(LOCATION_DETAIL.failure);

export const locationsTotalCountRequest = createAction(
  LOCATIONS_TOTAL_COUNT.request,
);
export const locationsTotalCountSuccess = createAction<number>(
  LOCATIONS_TOTAL_COUNT.success,
);
export const locationsTotalCountFailure = createAction<unknown>(
  LOCATIONS_TOTAL_COUNT.failure,
);

export const clearListLocations = createAction(CLEAR_LIST_LOCATIONS);
export const clearLocationDetail = createAction(CLEAR_LOCATION_DETAIL);
