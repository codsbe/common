export function groupBy<T, TKey extends string | number>(
  array: T[],
  selector: (item: T) => TKey,
): Record<TKey, T> {
  return array.reduce((acc, item) => ({ ...acc, [selector(item)]: item }), {}) as Record<TKey, T>;
}
