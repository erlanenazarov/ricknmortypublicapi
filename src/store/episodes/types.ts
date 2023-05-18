import { RecordOf } from 'immutable';

import {
  TRecordOfRemoteDataModel,
  TRecordOfListResponseModel,
  THandler,
  TSelectorReturnType,
} from 'store/types';
import { ICharacter } from 'store/characters/types';

export interface IEpisodesState {
  list: TRecordOfRemoteDataModel<TRecordOfListResponseModel<IEpisode>>;
  detail: TRecordOfRemoteDataModel<RecordOf<IEpisode>>;
  totalCount: TRecordOfRemoteDataModel<number>;
}

export type TEpisodesState = RecordOf<IEpisodesState>;
export type TEpisodesStateHandler<T = void> = THandler<TEpisodesState, T>;
export type TEpisodesStateSelectorReturnType<T> = TSelectorReturnType<
  T,
  TEpisodesState
>;

export interface IEpisode {
  id: string;
  name: string;
  air_date: string;
  episode: string;
  created: string;
}

export interface IEpisodeExpanded extends IEpisode {
  characters: ICharacter[];
}

export interface IRequestEpisodesListPayload {
  page: number;
  filters?: Record<string, string>;
}

export interface ISuccessEpisodesListPayload {
  count: number;
  results: IEpisode[];
}

export interface IEpisodeDetailRequestPayload {
  id: string;
}
