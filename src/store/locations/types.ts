import { RecordOf } from 'immutable';

import {
  TRecordOfRemoteDataModel,
  TRecordOfListResponseModel,
  THandler,
  TSelectorReturnType,
} from 'store/types';
import { ICharacter } from 'store/characters/types';

export interface ILocationState {
  list: TRecordOfRemoteDataModel<TRecordOfListResponseModel<ILocation>>;
  detail: TRecordOfRemoteDataModel<RecordOf<ILocationExpanded>>;
  totalCount: TRecordOfRemoteDataModel<number>;
}

export type TLocationState = RecordOf<ILocationState>;
export type TLocationStateHandler<T = void> = THandler<TLocationState, T>;
export type TLocationStateSelectorReturnType<T> = TSelectorReturnType<
  T,
  TLocationState
>;

export interface ILocation {
  id: string;
  name: string;
  type: string;
  dimension: string;
}

export interface ILocationExpanded extends ILocation {
  residents: Omit<ICharacter, 'location'>;
}

export interface IRequestLocationPayload {
  page: number;
  filters?: Record<string, string>;
}

export interface ISuccessLocationPayload {
  count: number;
  results: ILocation[];
}

export interface IRequestLocationDetailPayload {
  id: string;
}
