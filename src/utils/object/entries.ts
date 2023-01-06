/**
 * Well typed wrapper for `Object.entries`
 *
 * ~~~
 * enum Foo {
 *   A = 'a',
 *   B = 'b
 * }
 *
 * entries({ [Foo.A]: 1, [Foo.B]: 2 }) // [Foo, number][]
 * ~~~
 */
export const entries = Object.entries as <T>(
  o: T,
) => [Extract<keyof T, string | number>, T[keyof T]][];
