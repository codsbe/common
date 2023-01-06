import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

import { UserAuth } from '~/types';

import { ApiParams } from '../types';
import { setAuthorizationHeader } from './setAuthorizationHeader';

const retryKey = Symbol('request-retry');

let isRefreshing = false;
let failedQueue: { resolve(value: string): void; reject(reason: unknown): void }[] = [];

function runQueue({ error, token }: { error?: AxiosError; token?: string }): void {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
    promise.reject(undefined);
  });

  failedQueue = [];
}

export function hasUnauthorizedError(error: unknown, apiParams: ApiParams): error is AxiosError {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === 401 &&
    !isAxiosRequestRetry(error.config) &&
    error.config.url !== apiParams.refreshTokenUrl
  );
}

export function isAxiosRequestRetry(
  config: AxiosRequestConfig & { [retryKey]?: boolean },
): boolean {
  return Boolean(config[retryKey]);
}

export function retryWithNewTokens(
  instance: AxiosInstance,
  config: AxiosRequestConfig & { [retryKey]?: boolean },
  apiParams: ApiParams,
): AxiosPromise {
  if (isRefreshing) {
    return addToQueue(instance, config);
  }

  config[retryKey] = true;
  isRefreshing = true;

  return new Promise((resolve, reject) => {
    instance
      .post(apiParams.refreshTokenUrl, { refresh: apiParams.getRefreshToken() })
      .then(({ data }: AxiosResponse<UserAuth>) => {
        apiParams.onTokenRefreshSuccess?.(data);

        // todo: does it really need? test without it
        // instance.defaults.headers.common.Authorization = `Bearer ${data.access}`;

        const token = data.access;
        config.headers = setAuthorizationHeader(token, config.headers);

        runQueue({ token });

        resolve(instance(config));
      })
      .catch(error => {
        apiParams.onTokenRefreshError?.(error);

        runQueue({ error });
        reject(error);
      })
      .then(() => {
        isRefreshing = false;
      });
  });
}

function addToQueue(instance: AxiosInstance, config: AxiosRequestConfig): AxiosPromise {
  return new Promise<string>((resolve, reject) => {
    failedQueue.push({ resolve, reject });
  })
    .then(token => {
      config.headers = setAuthorizationHeader(token, config.headers);
      return instance(config);
    })
    .catch(err => {
      return Promise.reject(err);
    });
}
