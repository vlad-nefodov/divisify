import { createContext, useContext } from 'react';

export interface DropdownMenuContextValue {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const DropdownMenuContext = createContext<
  DropdownMenuContextValue | undefined
>(undefined);

export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(`useDropdownMenuContext should be used within the scope of 
    a DropdownMenu component.`);
  }
  return context;
};
