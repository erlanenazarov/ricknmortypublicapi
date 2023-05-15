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
