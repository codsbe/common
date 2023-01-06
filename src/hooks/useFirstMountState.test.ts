import { renderHook } from '@testing-library/react';

import { useFirstMountState } from './useFirstMountState';

test('Testing hook on first mount', () => {
  const { result } = renderHook(() => useFirstMountState());
  const initialState = result.current;
  expect(initialState).toEqual(true);
});

test('Testing hook after component rerenders ', () => {
  const { result, rerender } = renderHook(() => useFirstMountState());

  rerender();
  const updatedState = result.current;
  expect(updatedState).toEqual(false);
});
