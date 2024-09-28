import { ReactNode, createContext, useContext } from 'react';

import { SelectValue } from './Select.types';

export interface SelectContextValue {
  valueNode: ReactNode;
  value: SelectValue;
  isOpen: boolean;
  onControlledValueChange: (value: SelectValue, valueNode: ReactNode) => void;
  onValueChange: (value: SelectValue, valueNode: ReactNode) => void;
  onOpenChange: (isOpen: boolean) => void;
}

export const SelectContext = createContext<SelectContextValue | undefined>(
  undefined
);

export const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(`useSelectContext should be used within the scope of a 
    Select component.`);
  }
  return context;
};
