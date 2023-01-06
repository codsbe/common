/**
 * ~~~
 * chunk([1,2,3,4,5], 2) // [[1,2],[3,4],[5]]
 * ~~~
 */
export function chunk<T>(arr: T[], size: number): T[][] {
  const results = [];
  for (let i = 0; i < arr.length; i += size) {
    results.push(arr.slice(i, i + size));
  }
  return results;
}
