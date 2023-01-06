type FormDataEntry = [key: string, value: any];

/**
 * Allows to map keys and values in FormData (supports RN)
 *
 * ~~~
 * const formData = new FormData();
 * formData.append('someField', 'some string');
 * const newFormData = mapFormData(
 *   formData,
 *   ([key, value]) => [toSnakeCase(key), value],
 * ); // new form data where all keys are in snake_case
 * ~~~
 */
export function mapFormData(
  formData: FormData,
  callback: (item: FormDataEntry) => FormDataEntry,
): FormData {
  const entries = getEntries(formData);

  return entries.reduce<FormData>((acc, entry) => {
    acc.append(...callback(entry));
    return acc;
  }, new FormData());
}

function getEntries(formData: any): FormDataEntry[] {
  if ('_parts' in formData) {
    return formData['_parts'];
  }

  if ('entries' in formData) {
    return [...formData.entries()];
  }

  throw new Error('You are trying to map not a FormData object');
}
