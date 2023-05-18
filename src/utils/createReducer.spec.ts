import { RecordOf } from 'immutable';

import { IPayloadAction, THandlers } from 'store/types';

import { createImmutableRecord } from 'utils/createImmutableRecord';

import { applyHandler, createReducer } from './createReducer';

interface IState {
  count: number;
}
type TState = RecordOf<IState>;
const initialState: TState = createImmutableRecord({ count: 0 });

const handler = (state: TState, action: IPayloadAction<number>) =>
  state.update('count', prev => prev + action.payload);

describe('applyHandler', () => {
  it('should return the state unchanged if the action type is not handled', () => {
    const handlers = {};

    const action: IPayloadAction<number> = { type: 'INCREMENT', payload: 5 };
    const result = applyHandler(handlers, action, initialState);

    expect(result).toEqualImmutable(initialState);
  });

  it('should apply a single handler function if the action type is handled', () => {
    const handlers: THandlers<TState, number> = {
      INCREMENT: handler,
    };

    const action: IPayloadAction<number> = { type: 'INCREMENT', payload: 5 };
    const result = applyHandler(handlers, action, initialState);

    expect(result).toEqualImmutable(createImmutableRecord({ count: 5 }));
  });

  it('should apply multiple handler functions in order if the action type has an array of handlers', () => {
    const handlers: THandlers<TState, number> = {
      INCREMENT: [handler, handler],
    };

    const action: IPayloadAction<number> = { type: 'INCREMENT', payload: 5 };
    const result = applyHandler(handlers, action, initialState);

    expect(result).toEqualImmutable(createImmutableRecord({ count: 10 }));
  });
});

describe('createReducer', () => {
  it('should return a reducer function', () => {
    const handlers = {};

    const reducer = createReducer(initialState, handlers);

    expect(typeof reducer).toBe('function');
  });

  it('should return the initial state if the state is undefined', () => {
    const handlers = {};

    const reducer = createReducer<TState, number>(initialState, handlers);
    const result = reducer(undefined, { type: 'INCREMENT', payload: 5 });

    expect(result).toEqualImmutable(initialState);
  });

  it('should apply the appropriate handler function based on the action type', () => {
    const handlers: THandlers<TState, number> = {
      INCREMENT: handler,
    };

    const reducer = createReducer<TState, number>(initialState, handlers);
    const action: IPayloadAction<number> = { type: 'INCREMENT', payload: 5 };
    const result = reducer(initialState, action);

    expect(result).toEqualImmutable(createImmutableRecord({ count: 5 }));
  });
});
