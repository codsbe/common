const prepareValue = (value: string): string => value.toLowerCase().replace(' ', '');

/**
 * Checks if `searchValue` partially matches `value`
 *
 * ~~~
 * matchSearchValue('jo', 'John') // true
 * matchSearchValue('johndoe', 'John') // false
 * ~~~
 */
export function matchSearchValue(searchValue: string, value: string): boolean {
  return prepareValue(value).includes(prepareValue(searchValue));
}
