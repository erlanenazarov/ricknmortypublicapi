export type TCancelPromiseKey = '@@redux-saga/CANCEL_PROMISE';

export interface IPromiseCancelableBySaga<T> extends Promise<T> {
  '@@redux-saga/CANCEL_PROMISE'?: () => void;
}
