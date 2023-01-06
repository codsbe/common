import { ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { GqlClientContext, GqlConfig } from '~/services/gql/types';
import { getAuthorizationHeader } from '~/services/gql/utils';

export function createAuthLink(config: GqlConfig): ApolloLink {
  return setContext(async (_, prevContext: GqlClientContext) => {
    const { headers, withoutAuth } = prevContext;
    const accessToken = config.getAccessToken();

    return {
      ...prevContext,
      headers: {
        ...headers,
        ...getAuthorizationHeader(!withoutAuth ? accessToken : undefined),
      },
    };
  });
}
