import { GraphQLError } from 'graphql/index';

import { GQL_ERROR_CODE } from '~/services/gql/consts';
import { getGqlErrorCode } from '~/services/gql/utils';

export function hasGqlUnauthorizedError(gqlErrors?: readonly GraphQLError[]): boolean {
  return getGqlErrorCode(gqlErrors) === GQL_ERROR_CODE.TOKEN_EXPIRED;
}
