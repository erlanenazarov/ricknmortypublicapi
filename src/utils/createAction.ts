export type TActionReturnType<T = void> = {
  type: string;
  payload?: T;
};
export type TUtilType<T = undefined> = (payload?: T) => TActionReturnType<T>;

export interface IRequestActions {
  request: string;
  success: string;
  failure: string;
}

export const createAction =
  <T = undefined>(actionType: string): TUtilType<T> =>
  payload => ({
    type: actionType,
    payload,
  });

export const populateRequestActions = (
  stateKey: string,
  actionType: string,
): IRequestActions => {
  const getActionType = (postfix: string): string =>
    `${stateKey}/${actionType}_${postfix}`;

  return {
    request: getActionType('REQUEST'),
    success: getActionType('SUCCESS'),
    failure: getActionType('FAILURE'),
  };
};
