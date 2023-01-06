interface PluralizeOptions {
  plural?: string;
  withAmount?: boolean;
}

/**
 * Adds plural form for word depending on passed number
 *
 * ~~~
 * pluralize(1, 'contact'); // 1 contact
 * pluralize(2, 'contact'); // 2 contacts
 * pluralize(5, 'apple', { withAmount: false }); // apples
 * pluralize(1, 'person', { plural: 'people' }); // 1 person
 * pluralize(2, 'person', { plural: 'people' }); // 2 people
 * ~~~
 */
export function pluralize(
  amount: number,
  word: string,
  { plural = `${word}s`, withAmount = true }: PluralizeOptions = {},
): string {
  const pluralizedWord = [1, -1].includes(amount) ? word : plural;
  return withAmount ? `${amount} ${pluralizedWord}` : pluralizedWord;
}
