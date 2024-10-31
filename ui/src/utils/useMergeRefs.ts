import { MutableRefObject, RefCallback, useMemo } from 'react';

export type Ref<T> = RefCallback<T> | MutableRefObject<T> | null | undefined;

export function assignRef<T = any>(ref: Ref<T>, current: T) {
  if (ref == null) return;

  if (typeof ref === 'function') {
    ref(current);
    return;
  }

  try {
    ref.current = current;
  } catch (error) {
    throw new Error(`Cannot assign current '${current}' to ref '${ref}'`);
  }
}

export function mergeRefs<T>(...refsList: Ref<T>[]) {
  return (node: T | null) => {
    refsList.forEach((ref) => {
      assignRef(ref, node);
    });
  };
}

export function useMergeRefs<T>(...refsList: Ref<T>[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => mergeRefs(...refsList), refsList);
}
