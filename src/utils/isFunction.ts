import { UnknownFunction } from '~/types';

/**
 * Test argument for function
 *
 * ~~~
 * isFunction({}) // false
 * isFunction(() => {}) // true
 * ~~~
 */

export function isFunction(arg: unknown): arg is UnknownFunction {
  return Object.prototype.toString.call(arg) === '[object Function]';
}
