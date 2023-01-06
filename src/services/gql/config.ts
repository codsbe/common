import { ApolloClient } from '@apollo/client';

import { GqlConfig } from '~/services/gql/types';

export const gqlConfig: GqlConfig & { client: Nullable<ApolloClient<unknown>> } = {
  client: null,
  serverUrl: '',
  onUnknownError: () => undefined,
  getRefreshToken: () => '',
  getAccessToken: () => '',
  refreshTokens: async () => null,
  onTokenRefreshSuccess: () => undefined,
  onTokenRefreshError: () => undefined,
};
