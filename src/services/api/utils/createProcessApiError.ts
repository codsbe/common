import { FieldPath } from 'react-hook-form';

import { GLOBAL_ERROR_NAME } from '~/constants';
import { ResponseErrors } from '~/types';
import { entries } from '~/utils/object';

interface CreateProcessApiErrorOptions {
  onGlobalError: (message: string) => void;
  onUnknownErrors: (message: string) => void;
}

export interface ProcessApiErrorOptions<TFormValues> {
  errors: ResponseErrors;
  fields?: Record<string, FieldPath<TFormValues>> | FieldPath<TFormValues>[];
  setFieldError?: (name: FieldPath<TFormValues>, message: string) => void;
}

export function createProcessApiError({
  onGlobalError,
  onUnknownErrors,
}: CreateProcessApiErrorOptions) {
  return function processApiError<TFormValues>({
    fields = {},
    setFieldError,
    errors,
  }: ProcessApiErrorOptions<TFormValues>): void {
    const unknownErrors: { name: string; value: string }[] = [];

    if (errors[GLOBAL_ERROR_NAME]) {
      onGlobalError(errors[GLOBAL_ERROR_NAME]);
      return;
    }

    entries(errors).forEach(([field, error]) => {
      // eslint-disable-next-line no-nested-ternary
      const formField: FieldPath<TFormValues> | undefined = Array.isArray(fields)
        ? fields.includes(field as FieldPath<TFormValues>)
          ? (field as FieldPath<TFormValues>)
          : undefined
        : fields[field];

      if (formField && setFieldError) {
        setFieldError(formField, error);
      } else {
        unknownErrors.push({ name: field, value: error });
      }
    });

    if (unknownErrors.length > 0) {
      onUnknownErrors(`Oops! There are unknown errors: ${JSON.stringify(unknownErrors)}`);
    }
  };
}
