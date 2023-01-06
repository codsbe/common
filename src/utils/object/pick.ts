/**
 * Function that makes new object including `keys` properties
 *
 * ~~~
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { a: 1, b: 2 }
 * ~~~
 */
export function pick<T extends Record<any, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const initialValue: any = {};
  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), initialValue);
}
