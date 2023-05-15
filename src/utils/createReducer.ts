import has from 'lodash/has';
import isArray from 'lodash/isArray';

import { IPayloadAction, THandlers, THandler } from 'store/types';

import { combineChanges } from './combineChanges';

export const applyHandler = <T, S = never>(
  handlers: THandlers<T, S>,
  action: IPayloadAction<S>,
  state: T,
): T => {
  if (!has(handlers, action.type)) {
    return state;
  }
  if (!isArray(handlers[action.type])) {
    const reducerFn = handlers[action.type] as THandler<T, S>;
    return reducerFn(state, action);
  }
  const reducerChain = handlers[action.type] as THandler<T, S>[];
  return combineChanges<T, S>(reducerChain, state, action);
};

export const createReducer =
  <T, S = never>(initialState: T, handlers: THandlers<T, S>) =>
  (state = initialState, action: IPayloadAction<S>): T =>
    applyHandler<T, S>(handlers, action, state);
