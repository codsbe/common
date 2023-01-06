/**
 * Checks `arg` for string
 *
 * ~~~
 * isString('') // true
 * isString([]) // false
 * ~~~
 */
export function isString(arg: unknown): arg is string {
  return typeof arg === 'string';
}
