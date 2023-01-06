let counter = 0;

/**
 * ~~~
 * uniqueId('foo') // foo_1
 * uniqueId('bar') // bar_2
 * uniqueId() // 3
 * uniqueId() // 4
 * ~~~
 *
 * @returns incremented number
 */
export function uniqueId(prefix: string): string;
export function uniqueId(): number;
export function uniqueId(prefix?: string): number | string {
  counter += 1;
  return prefix === undefined ? counter : `${prefix}${counter}`;
}
