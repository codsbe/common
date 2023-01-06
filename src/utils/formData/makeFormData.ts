import { isPlainObject } from '~/utils/object';

/**
 * Function that makes `FormData` from object
 *
 * ~~~
 * makeFormData({ a: 1, b: 2 }) // FormData
 * ~~~
 */
export function makeFormData(
  object: any,
  formData: FormData = new FormData(),
  prefix?: string,
): FormData {
  if (object === undefined) {
    return formData;
  }

  if (Array.isArray(object)) {
    if (!object.length) {
      makeFormData('', formData, `${prefix}`);
    } else {
      object.forEach((value, index) => makeFormData(value, formData, `${prefix}[${index}]`));
    }
  } else if (isPlainObject(object)) {
    Object.entries(object).forEach(([name, value]) => {
      if (prefix && /\[\d+\]$/.test(prefix)) {
        name = prefix ? `${prefix}${name}` : name;
      } else {
        name = prefix ? `${prefix}.${name}` : name;
      }
      makeFormData(value, formData, name);
    });
  } else if (object !== null) {
    let value = object;

    if (typeof value === 'boolean') {
      value = Number(value);
    }

    formData.append(`${prefix}`, value);
  }

  return formData;
}
