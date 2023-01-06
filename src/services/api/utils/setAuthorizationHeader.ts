import { AxiosRequestHeaders } from 'axios';

export function setAuthorizationHeader(
  token: string,
  headers: AxiosRequestHeaders = {},
): AxiosRequestHeaders {
  return { ...headers, Authorization: `Bearer ${token}` };
}
