import { renderHook } from '@testing-library/react';

import { useMountEffect } from './useMountEffect';

let increment = 0;

const increase = (): void => {
  increment = 1;
};

test('Testing if increment increased after component mounted', () => {
  renderHook(() => useMountEffect(increase));

  expect(increment).toBe(1);
});

test('Testing if increment didn`t increase after component rerendered', () => {
  const { rerender } = renderHook(() => useMountEffect(increase));

  expect(increment).toBe(1);

  rerender();

  expect(increment).toBe(1);
});
