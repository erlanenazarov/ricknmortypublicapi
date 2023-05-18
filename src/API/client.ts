import { GraphQLClient, RequestDocument, Variables } from 'graphql-request';

import { IPromiseCancelableBySaga } from './types';
import { CANCEL_PROMISE_KEY } from './constants';

export class BaseGraphQLClient extends GraphQLClient {
  cancelableRequest = <T>(
    document: RequestDocument,
    variables?: Variables,
  ): IPromiseCancelableBySaga<T> => {
    const abortController = new AbortController();

    const promise: IPromiseCancelableBySaga<T> = this.request<T>({
      document,
      variables,
      signal: abortController.signal,
    });

    promise[CANCEL_PROMISE_KEY] = () => {
      abortController.abort();
    };

    return promise;
  };
}
