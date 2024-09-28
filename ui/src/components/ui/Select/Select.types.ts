import { ComponentPropsWithoutRef, ReactNode } from 'react';

import SelectContent from './SelectContent/SelectContent';
import SelectTrigger from './SelectTrigger/SelectTrigger';

export type SelectValue = string | number | undefined;

export interface SelectState {
  valueNode: ReactNode;
  value: SelectValue;
  isOpen: boolean;
}

export interface SelectExtensions {
  Trigger: typeof SelectTrigger;
  Content: typeof SelectContent;
}

export interface SelectProps extends ComponentPropsWithoutRef<'button'> {
  value?: SelectValue;
  isOpen?: boolean;
  onValueChange?: (value: SelectValue) => void;
  onOpenChange?: (isOpen: boolean) => void;
}
