import { useEffect, useRef } from 'react';

import { UnknownFunction } from '~/types';

export function useInterval(callback: UnknownFunction, delay?: number | null): void {
  const savedCallback = useRef<UnknownFunction>(() => {});

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    if (delay !== null) {
      const interval = setInterval(() => savedCallback.current(), delay || 0);
      return () => clearInterval(interval);
    }

    return undefined;
  }, [delay]);
}
