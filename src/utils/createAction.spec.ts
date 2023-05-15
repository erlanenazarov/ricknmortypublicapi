import {
  TActionReturnType,
  TUtilType,
  IRequestActions,
  createAction,
  populateRequestActions,
} from './createAction';

describe('createAction', () => {
  it('should create an action with the specified type and payload', () => {
    const actionType = 'INCREMENT';
    const payload = 5;

    const action: TUtilType<number> = createAction(actionType);
    const result: TActionReturnType<number> = action(payload);

    expect(result.type).toBe(actionType);
    expect(result.payload).toBe(payload);
  });

  it('should create an action without a payload if not provided', () => {
    const actionType = 'RESET';

    const action: TUtilType = createAction(actionType);
    const result: TActionReturnType = action();

    expect(result.type).toBe(actionType);
    expect(result.payload).toBeUndefined();
  });
});

describe('populateRequestActions', () => {
  it('should populate request actions with the specified state key and action type', () => {
    const stateKey = 'users';
    const actionType = 'FETCH';

    const result: IRequestActions = populateRequestActions(
      stateKey,
      actionType,
    );

    expect(result.request).toBe('users/FETCH_REQUEST');
    expect(result.success).toBe('users/FETCH_SUCCESS');
    expect(result.failure).toBe('users/FETCH_FAILURE');
  });
});
