import { ApolloClient, InMemoryCacheConfig } from '@apollo/client';

import { GQL_ERROR_CODE } from '~/services/gql/consts';
import { UserAuth } from '~/types';

export interface GqlClientContext {
  headers?: Record<string, unknown>;
  withoutAuth?: boolean;
}

export interface GqlErrorResponse {
  code: GQL_ERROR_CODE;
  explain?: Record<string, string>;
}

export interface GqlConfig {
  serverUrl: string;
  onUnknownError: (message: string) => void;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
  onTokenRefreshSuccess: (auth: UserAuth) => void;
  onTokenRefreshError: (error?: unknown) => void;
  refreshTokens: (
    client: ApolloClient<unknown>,
    context: GqlClientContext,
  ) => Promise<Nullable<UserAuth>>;
  cache?: InMemoryCacheConfig;
}
