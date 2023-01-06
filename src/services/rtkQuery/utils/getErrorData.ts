import { ResponseErrors } from '~/types';

export function getErrorData(error: unknown): ResponseErrors {
  return (error as { data: ResponseErrors }).data;
}
