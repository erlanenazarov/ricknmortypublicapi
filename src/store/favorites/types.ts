import { List, RecordOf } from 'immutable';

import {
  THandler,
  TSelectorReturnType,
  TRecordOfRemoteDataModel,
} from 'store/types';
import { ICharacter } from 'store/characters/types';

export interface IFavoritesState {
  cached: List<string>;
  fetched: TRecordOfRemoteDataModel<List<ICharacter>>;
}

export type TFavoritesState = RecordOf<IFavoritesState>;
export type TFavoritesStateHandler<T = void> = THandler<TFavoritesState, T>;
export type TFavoritesStateSelectorReturnType<T> = TSelectorReturnType<
  T,
  TFavoritesState
>;
