import {
  HTMLAttributes,
  ReactNode,
  cloneElement,
  forwardRef,
  isValidElement
} from 'react';

import { useMergeProps } from '../../../utils/useMergeProps';
import { useMergeRefs } from '../../../utils/useMergeRefs';

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

const Slot = forwardRef<HTMLElement, SlotProps>((props, forwardedRef) => {
  const { children, ...slotProps } = props;
  const mergedProps = useMergeProps(slotProps, (children as any).props);
  const ref = useMergeRefs(forwardedRef, (children as any).ref);

  if (!isValidElement(children)) {
    return null;
  }

  return cloneElement(children, {
    ...mergedProps,
    ref
  } as any);
});

export default Slot;
