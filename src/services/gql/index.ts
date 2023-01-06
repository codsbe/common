import { ApolloClient, from, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

import { gqlConfig } from './config';
import { createAuthLink } from './links/createAuthLink';
import { createErrorLink } from './links/createErrorLink';
import { GqlConfig } from './types';

export function createGqlClient(config: GqlConfig): ApolloClient<unknown> {
  gqlConfig.client = new ApolloClient({
    link: from([
      createErrorLink(config),
      createAuthLink(config),
      createUploadLink({ uri: config.serverUrl }),
    ]),
    cache: new InMemoryCache(config.cache),
  });

  Object.assign(gqlConfig, config);

  return gqlConfig.client;
}

export * from './types';
