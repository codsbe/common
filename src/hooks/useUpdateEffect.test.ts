import { act, renderHook } from '@testing-library/react';
import { useState } from 'react';

import { useUpdateEffect } from './useUpdateEffect';

let increment = 0;

const increase = (): void => {
  increment += 1;
};

beforeEach(() => {
  increment = 0;
});

test('On first mount increment should not be increased', () => {
  const { result } = renderHook(() => useState(1));

  renderHook(() => useUpdateEffect(increase, [result.current[0]]));

  expect(increment).toBe(0);
});

test('After rerender of component increment should increased if there any changes in deps list', () => {
  const { result } = renderHook(() => useState(1));

  const { rerender } = renderHook(() => useUpdateEffect(increase, [result.current[0]]));

  act(() => {
    result.current[1](2);
  });

  rerender();

  expect(increment).toBe(1);

  act(() => {
    result.current[1](3);
  });

  rerender();

  expect(increment).toBe(2);
});

test('If component rerenders but there are no changes in deps list, increment should not be increased', () => {
  const { result } = renderHook(() => useState(1));

  const { rerender } = renderHook(() => useUpdateEffect(increase, [result.current[0]]));

  act(() => {
    result.current[1](1);
  });

  rerender();

  expect(increment).toBe(0);
});
