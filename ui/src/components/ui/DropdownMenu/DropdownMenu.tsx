import {
  ComponentPropsWithoutRef,
  FC,
  useEffect,
  useRef,
  useState
} from 'react';

import Content from './Content/Content';
import { DropdownMenuContext } from './DropdownMenuContext';
import Trigger from './Trigger/Trigger';
import classNames from 'classnames/bind';
import styles from './DropdownMenu.module.scss';
import { useOnClickOutside } from 'usehooks-ts';

export interface DropdownMenuExtensions {
  Trigger: typeof Trigger;
  Content: typeof Content;
}
export interface DropdownMenuProps extends ComponentPropsWithoutRef<'div'> {
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

const cx = classNames.bind(styles);

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

  return (
    <div className={cx('dropdown-menu', className)} ref={ref} {...rest}>
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

DropdownMenu.Trigger = Trigger;
DropdownMenu.Content = Content;
export default DropdownMenu;
