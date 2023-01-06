import { EffectCallback, useEffect } from 'react';

export function useMountEffect(effect: EffectCallback): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, []);
}
