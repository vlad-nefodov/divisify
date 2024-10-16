import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Content from './Content/Content';
import Trigger from './Trigger/Trigger';

export type SelectValue = string | number | undefined;

export interface SelectState {
  valueNode: ReactNode;
  value: SelectValue;
  isOpen: boolean;
}

export interface SelectExtensions {
  Trigger: typeof Trigger;
  Content: typeof Content;
}

export interface SelectProps extends ComponentPropsWithoutRef<'button'> {
  value?: SelectValue;
  isOpen?: boolean;
  onValueChange?: (value: SelectValue) => void;
  onOpenChange?: (isOpen: boolean) => void;
}
