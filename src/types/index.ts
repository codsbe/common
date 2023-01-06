/**
 * Using for response errors from API
 */
export type ResponseErrors = Record<string, string>;

export type UnknownFunction = (...args: unknown[]) => unknown;

export interface UserAuth {
  refresh: string;
  access: string;
}
