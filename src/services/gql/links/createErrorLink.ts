import { ApolloLink, fromPromise } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { getOperationName } from '@apollo/client/utilities';

import { gqlConfig } from '../config';
import { GqlClientContext, GqlConfig } from '../types';
import {
  getAuthorizationHeader,
  hasGqlBusinessError,
  hasGqlUnauthorizedError,
  refreshTokens,
} from '../utils';

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];
const resolvePendingRequests = (): void => {
  pendingRequests.forEach(callback => callback());
  pendingRequests = [];
};

export function createErrorLink(config: GqlConfig): ApolloLink {
  return onError(({ graphQLErrors, operation, forward }) => {
    if (hasGqlUnauthorizedError(graphQLErrors)) {
      let forwards;
      if (!isRefreshing) {
        isRefreshing = true;
        forwards = fromPromise(
          refreshTokens()
            .then(({ access, refresh }) => {
              config.onTokenRefreshSuccess({ access, refresh });
              operation.setContext((prevContext: GqlClientContext) => ({
                ...prevContext,
                headers: {
                  ...prevContext.headers,
                  ...getAuthorizationHeader(access),
                },
              }));
              return true;
            })
            .then(() => {
              resolvePendingRequests();
              return true;
            })
            .catch(e => {
              pendingRequests = [];
              config.onTokenRefreshError(e);
              return false;
            })
            .finally(() => {
              isRefreshing = false;
            }),
        ).filter(Boolean);
      } else {
        forwards = fromPromise(
          new Promise<void>(resolve => {
            pendingRequests.push(() => resolve());
          }),
        );
      }

      return forwards.flatMap(() => forward(operation));
    }

    if (!hasGqlBusinessError(graphQLErrors)) {
      const operationName = getOperationName(operation.query);
      gqlConfig.onUnknownError(`Something went wrong in "${operationName}"`);
    }

    return undefined;
  });
}
