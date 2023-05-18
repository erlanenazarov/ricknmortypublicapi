import { RecordOf } from 'immutable';

import {
  TRecordOfRemoteDataModel,
  TRecordOfListResponseModel,
  TSelectorReturnType,
  THandler,
} from 'store/types';
import { ILocation } from 'store/locations/types';
import { IEpisode } from 'store/episodes/types';

export interface ICharactersState {
  list: TRecordOfRemoteDataModel<TRecordOfListResponseModel<ICharacter>>;
  detail: TRecordOfRemoteDataModel<RecordOf<ICharacterExpanded>>;
  totalCount: TRecordOfRemoteDataModel<number>;
}

export type TCharactersState = RecordOf<ICharactersState>;
export type TCharactersStateHandler<T = void> = THandler<TCharactersState, T>;
export type TCharactersSelectorReturnType<T> = TSelectorReturnType<
  T,
  TCharactersState
>;

export enum EGender {
  MALE = 'Male',
  FEMALE = 'Female',
  GENDERLESS = 'Genderless',
  UNKNOWN = 'unknown',
}

export enum ECharacterStatus {
  ALIVE = 'Alive',
  DEAD = 'Dead',
  UNKNOWN = 'unknown',
}

export interface ICharacter {
  id: string;
  name: string;
  status: ECharacterStatus;
  species: string;
  type: string;
  gender: EGender;
  image: string;
}

export interface ICharacterExpanded extends ICharacter {
  location: ILocation;
  origin: ILocation;
  episode: IEpisode[];
}

export interface IListCharactersRequestPayload {
  page: number;
  filters?: Record<string, string>;
}

export interface IListCharactersSuccessPayload {
  count: number;
  data: ICharacter[];
}

export interface IGetCharacterRequestPayload {
  id: string;
}
