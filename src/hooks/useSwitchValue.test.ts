import { act, renderHook } from '@testing-library/react';

import { useSwitchValue } from './useSwitchValue';

test('Testing initialState of useSwitchValue', () => {
  const { result } = renderHook(() => useSwitchValue(false));

  expect(result.current.value).toBe(false);
});

test('Testing on() function', () => {
  const { result } = renderHook(() => useSwitchValue(false));

  act(() => {
    result.current.on();
  });

  expect(result.current.value).toBe(true);
});

test('Testing off() function', () => {
  const { result } = renderHook(() => useSwitchValue(false));

  act(() => {
    result.current.on();

    result.current.off();
  });

  expect(result.current.value).toBe(false);
});

test('Testing toggle() function', () => {
  const { result } = renderHook(() => useSwitchValue(false));

  act(() => {
    result.current.toggle();
  });

  expect(result.current.value).toBe(true);

  act(() => {
    result.current.toggle();
  });

  expect(result.current.value).toBe(false);
});
