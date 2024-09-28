import './DropdownMenu.css';

import {
  ComponentPropsWithoutRef,
  FC,
  useEffect,
  useRef,
  useState
} from 'react';

import DropdownMenuContent from './DropdownMenuContent/DropdownMenuContent';
import { DropdownMenuContext } from './DropdownMenuContext';
import DropdownMenuTrigger from './DropdownMenuTrigger/DropdownMenuTrigger';
import classNames from '../../../utils/classNames';
import { useOnClickOutside } from 'usehooks-ts';

export interface DropdownMenuExtensions {
  Trigger: typeof DropdownMenuTrigger;
  Content: typeof DropdownMenuContent;
}
export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const DropdownMenu: FC<DropdownMenuProps> & DropdownMenuExtensions = (
  props
) => {
  const {
    isOpen: controlledIsOpen,
    onOpenChange,
    className,
    children,
    ...rest
  } = props;

  const isOpenControlled = controlledIsOpen !== undefined;

  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(Boolean(controlledIsOpen));

  useEffect(() => {
    if (isOpenControlled && controlledIsOpen !== isOpen) {
      setIsOpen(controlledIsOpen);
    }
  }, [isOpen, isOpenControlled, controlledIsOpen]);

  const onOpenChangeHandler = (isOpen: boolean) => {
    onOpenChange?.(isOpen);

    if (!isOpenControlled) {
      setIsOpen(isOpen);
    }
  };

  useOnClickOutside(ref, () => {
    if (isOpen) {
      onOpenChangeHandler(false);
    }
  });

  const styleNames = classNames(
    'dropdown-menu',
    {
      'dropdown-menu--open': isOpen
    },
    className
  );

  return (
    <div className={styleNames} ref={ref} {...rest}>
      <DropdownMenuContext.Provider
        value={{
          isOpen,
          onOpenChange: onOpenChangeHandler
        }}
      >
        {children}
      </DropdownMenuContext.Provider>
    </div>
  );
};

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Content = DropdownMenuContent;
export default DropdownMenu;
