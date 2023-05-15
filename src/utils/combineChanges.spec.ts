import { IPayloadAction, THandler } from 'store/types';

import { combineChanges } from './combineChanges';

interface MyState {
  count: number;
  message: string;
}

const initialState: MyState = {
  count: 0,
  message: '',
};

const incrementCount: THandler<MyState, string> = (state, action) => ({
  ...state,
  count: state.count + Number(action.payload),
});

const setMessage: THandler<MyState, string> = (state, action) => ({
  ...state,
  message: action.payload,
});

describe('combineChanges', () => {
  it('should apply all changes to the state', () => {
    const changes: THandler<MyState, string>[] = [incrementCount, setMessage];
    const action: IPayloadAction<string> = {
      type: 'UPDATE',
      payload: '5',
    };

    const nextState = combineChanges<MyState, string>(
      changes,
      initialState,
      action,
    );

    expect(nextState.count).toBe(5);
    expect(nextState.message).toBe('5');
  });

  it('should return the current state if no changes are provided', () => {
    const changes: THandler<MyState, string>[] = [];
    const action: IPayloadAction<string> = {
      type: 'UPDATE',
      payload: '5',
    };

    const nextState = combineChanges<MyState, string>(
      changes,
      initialState,
      action,
    );

    expect(nextState).toStrictEqual(initialState);
  });
});
