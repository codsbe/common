import axios from 'axios';

import { GLOBAL_ERROR_NAME } from '~/constants';
import { ResponseErrors } from '~/types';
import { entries, isPlainObject, keys } from '~/utils/object';

interface HandleRequestErrorOptions {
  handleRawErrors?: (errors: Record<string, any>) => void;
}

/**
 * Function handles error from API
 */
export function handleRequestError(
  error: unknown,
  { handleRawErrors }: HandleRequestErrorOptions = {},
): ResponseErrors {
  const errors: ResponseErrors = {};

  if (!axios.isAxiosError(error)) {
    errors[GLOBAL_ERROR_NAME] = MESSAGES.UNKNOWN;
    return errors;
  }

  if (error.response) {
    switch (error.response.status) {
      case 400:
      case 403: {
        const { data } = error.response;
        if (!hasErrorDetails(data)) {
          errors[GLOBAL_ERROR_NAME] = MESSAGES.SERVER_ERROR;
          break;
        }
        if (handleRawErrors) {
          handleRawErrors(data.detail);
        }
        entries(data.detail).forEach(([field, message]) => {
          if (isPlainObject(message)) {
            keys(message).forEach(subfield => {
              errors[`${field}.${subfield}`] = getErrorMessage(message[subfield]);
            });
          } else {
            errors[field] = getErrorMessage(message);
          }
        });
        break;
      }
      case 401: {
        // axios interceptors handles this case to refresh auth tokens
        break;
      }
      default:
        // 500, 502
        errors[GLOBAL_ERROR_NAME] = MESSAGES.SERVER_ERROR;
        break;
    }
  } else if (error.request && error.request.status === 0) {
    errors[GLOBAL_ERROR_NAME] = MESSAGES.NETWORK_ERROR;
  } else {
    errors[GLOBAL_ERROR_NAME] = MESSAGES.UNKNOWN;
  }

  if ('objectError' in errors) {
    errors[GLOBAL_ERROR_NAME] = errors.objectError;
    delete errors.objectError;
  }

  return errors;
}

const MESSAGES = {
  SERVER_ERROR: 'Server error',
  NETWORK_ERROR: 'Network error',
  UNKNOWN: 'Something went wrong',
};

function hasErrorDetails(data: unknown): data is { detail: Record<string, any> } {
  return 'detail' in (data as { detail?: Record<string, any> });
}

function getErrorMessage(error: unknown): string {
  return Array.isArray(error) ? error[0] : error;
}
