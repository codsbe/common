/**
 * This status is for async operations
 *
 * ~~~
 * const state = {
 *   list: List[],
 *   listStatus: AsyncStatus,
 * };
 *
 * ...
 *
 * if (listStatus === AsyncStatus.SUCCESS) {
 *   renderList();
 * }
 * if (listStatus === AsyncStatus.FAIL {
 *   renderError();
 * }
 * ~~~
 */
export enum AsyncStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAIL = 'error',
}

/**
 * Using for errors from API
 */
export const GLOBAL_ERROR_NAME = 'globalError';
