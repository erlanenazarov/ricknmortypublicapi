import { List, RecordOf } from 'immutable';
import { Task } from 'redux-saga';
import { Store } from 'redux';
import {
  GetParamsFromSelectors,
  OutputSelector,
  SelectorResultArray,
} from 'reselect';

import { TFormState } from './forms/types';
import { TCharactersState } from './characters/types';
import { TLocationState } from './locations/types';
import { TEpisodesState } from './episodes/types';
import { TFavoritesState } from './favorites/types';

export interface IAppState {
  characters: TCharactersState;
  locations: TLocationState;
  episodes: TEpisodesState;
  forms: TFormState;
  favorites: TFavoritesState;
}

export interface ISagaTask {
  sagaTask?: Task;
}

export interface IWithSagaTaskStore extends ISagaTask, Store<IAppState> {
  initialState?: IAppState;
}

export interface IPayloadAction<P = void, T extends string = string> {
  payload: P;
  type: T;
}

export type THandler<T, S = void> = (state: T, action: IPayloadAction<S>) => T;
export type THandlers<T, S = void> = {
  [action: string]: THandler<T, S> | THandler<T, S>[];
};

export interface IRemoteDataModel<T, E = unknown> {
  fetching: boolean;
  data: T | null;
  error: E | null;
}

export interface IListResponseModel<T> {
  count: number;
  results: List<T>;
}

export type TRecordOfRemoteDataModel<T> = RecordOf<IRemoteDataModel<T>>;
export type TRecordOfListResponseModel<T> = RecordOf<IListResponseModel<T>>;

export type TSelectorReturnType<T, D> = OutputSelector<
  [(state: IAppState) => D],
  T,
  (...args: SelectorResultArray<[(state: IAppState) => D]>) => T,
  GetParamsFromSelectors<[(state: IAppState) => D]>
>;
