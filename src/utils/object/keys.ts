/**
 * Well typed wrapper for `Object.keys`
 *
 * ~~~
 * enum Foo {
 *   A = 'a',
 *   B = 'b
 * }
 *
 * keys({ [Foo.A]: 1, [Foo.B]: 2 }) // Foo[]
 * ~~~
 */
export const keys = Object.keys as <T>(o: T) => (keyof T)[];
