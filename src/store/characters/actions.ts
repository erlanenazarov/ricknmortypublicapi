import { createAction, populateRequestActions } from 'utils/createAction';

import {
  IListCharactersSuccessPayload,
  IListCharactersRequestPayload,
  IGetCharacterRequestPayload,
  ICharacterExpanded,
} from './types';

const STATE_KEY = '@characters';

export const LIST_CHARACTERS = populateRequestActions(
  STATE_KEY,
  'LIST_CHARACTERS',
);

export const LIST_CHARACTERS_CLEAR = `${STATE_KEY}/LIST_CHARACTERS_CLEAR`;

export const CHARACTER_DETAIL = populateRequestActions(
  STATE_KEY,
  'CHARACTER_DETAIL',
);
export const CHARACTER_DETAIL_CLEAR = `${STATE_KEY}/CHARACTER_DETAIL_CLEAR`;

export const listCharactersRequest =
  createAction<IListCharactersRequestPayload>(LIST_CHARACTERS.request);
export const listCharactersSuccess =
  createAction<IListCharactersSuccessPayload>(LIST_CHARACTERS.success);
export const listCharactersFailure = createAction<unknown>(
  LIST_CHARACTERS.failure,
);

export const listCharactersClear = createAction(LIST_CHARACTERS_CLEAR);

export const characterDetailRequest = createAction<IGetCharacterRequestPayload>(
  CHARACTER_DETAIL.request,
);
export const characterDetailSuccess = createAction<ICharacterExpanded>(
  CHARACTER_DETAIL.success,
);
export const characterDetailFailure = createAction<unknown>(
  CHARACTER_DETAIL.failure,
);
export const characterDetailClear = createAction(CHARACTER_DETAIL_CLEAR);
