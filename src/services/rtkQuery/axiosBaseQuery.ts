import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Api } from '~/services/api/Api';
import { handleRequestError } from '~/services/api/utils';
import { ResponseErrors } from '~/types';
import { isPlainObject } from '~/utils/object';

export interface AxiosBaseQueryParams {
  transformResponse?: (data: AxiosResponse['data']) => Record<string, any>;
}

export interface AxiosBaseQueryError {
  status?: number;
  data: ResponseErrors;
  extraOptions?: Record<string, any>;
}

/**
 * Implementation of axios base query using our Api service.
 * You should initialize Api service before using it.
 *
 * Example:
 * ~~~
 * import { axiosBaseQuery } from '@codsbe/common/lib/services/rtkQuery';
 * import { createApi } from '@reduxjs/toolkit/query/react';
 *
 * import { TAGS } from '~/services/rtkQuery/utils';
 *
 * export const rtkQuery = createApi({
 *   reducerPath: 'rtkReducer',
 *   baseQuery: axiosBaseQuery({ transformResponse: data => data.data }),
 *   tagTypes: Object.values(TAGS),
 *   endpoints: () => ({}),
 * });
 * ~~~
 *
 */

export const axiosBaseQuery =
  ({ transformResponse }: AxiosBaseQueryParams = {}): BaseQueryFn<
    {
      data?: AxiosRequestConfig['data'];
      extraOptions?: Record<string, any>;
      headers?: AxiosRequestConfig['headers'];
      method?: AxiosRequestConfig['method'];
      params?: AxiosRequestConfig['params'];
      transformRequest?: AxiosRequestConfig['transformRequest'];
      url: string;
    },
    unknown,
    AxiosBaseQueryError
  > =>
  async ({ url, method = 'GET', data, params, headers, transformRequest, extraOptions }) => {
    try {
      const result = await Api.request<any>({
        url,
        method,
        data,
        params,
        headers,
        transformRequest,
      });
      const response = transformResponse ? transformResponse(result.data) : result.data ?? {};
      return {
        data: isPlainObject(response)
          ? Object.assign(response, extraOptions ? { extraOptions } : {})
          : response,
      };
    } catch (e) {
      return {
        error: {
          status: (e as AxiosError).response?.status,
          data: handleRequestError(e),
          extraOptions,
        },
      };
    }
  };
