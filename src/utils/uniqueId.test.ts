import { uniqueId } from './uniqueId';

test('is working correctly', () => {
  expect(uniqueId()).toBe(1);
  expect(uniqueId()).toBe(2);
  expect(uniqueId('test')).toBe('test3');
  expect(uniqueId('test_1')).toBe('test_14');
  for (let i = 0; i < 9; i++) {
    uniqueId();
  }

  // todo: fails here, should be fixed in `uniqueId`
  // expect(uniqueId('test_')).not.toBe('test_14');
});
