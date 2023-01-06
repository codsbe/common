import { makeFormData } from './makeFormData';

test('is working correctly', () => {
  const obj = {
    a: {
      b: 5,
      d: [1, 2],
      e: [{ f: 'f' }],
      m: [
        {
          n: {
            o: 6,
          },
        },
      ],
      g: new File([''], 'foo'),
    },
    c: 3,
    h: [],
    i: false,
    j: true,
    k: null,
    l: undefined,
  };
  const formData = makeFormData(obj);

  // nested object
  expect(formData.get('a.b')).toBe('5');

  // number at root level
  expect(formData.get('c')).toBe('3');

  // array with numbers
  expect(formData.get('a.d[0]')).toBe('1');
  expect(formData.get('a.d[1]')).toBe('2');

  // array with objects
  expect(formData.get('a.e[0]f')).toBe('f');

  // array with nested objects
  expect(formData.get('a.m[0]n.o')).toBe('6');

  // files
  expect(formData.get('a.g')).toBeInstanceOf(File);

  // empty array
  expect(formData.get('h')).toBe('');

  // unknown key
  expect(formData.get('unknown')).toBe(null);

  // boolean
  expect(formData.get('i')).toBe('0');
  expect(formData.get('j')).toBe('1');

  // null
  expect(formData.get('k')).toBe(null);

  // undefined
  expect(formData.get('l')).toBe(null);
});
