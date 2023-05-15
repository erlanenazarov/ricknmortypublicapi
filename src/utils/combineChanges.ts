import { IPayloadAction, THandler } from 'store/types';

export const combineChanges = <T, S = void>(
  changes: THandler<T, S>[],
  curState: T,
  action: IPayloadAction<S>,
): T => {
  return changes.reduce(
    (state: T, reducer: THandler<T, S>): T => reducer(state, action),
    curState,
  );
};
