/**
 * Function that makes new object excluding `keys` properties
 *
 * ~~~
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'b']) // { c: 3 }
 * ~~~
 */
export function omit<T extends Record<any, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (Object.prototype.hasOwnProperty.call(acc, key)) {
        delete acc[key];
      }
      return acc;
    },
    { ...obj },
  );
}
