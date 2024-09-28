import './DropdownMenuContentItem.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../../../utils/classNames';
import { useDropdownMenuContext } from '../../DropdownMenuContext';

export interface DropdownMenuContentItemProps
  extends ComponentPropsWithoutRef<'button'> {
  variant?: 'danger';
}

const DropdownMenuContentItem: FC<DropdownMenuContentItemProps> = (props) => {
  const { variant, onClick, className, children, ...rest } = props;
  const styleNames = classNames(
    'dropdown-menu-content__item',
    {
      [`dropdown-menu-content__item--${variant}`]: variant
    },
    className
  );

  const { onOpenChange } = useDropdownMenuContext();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(e);
    onOpenChange(false);
  };

  return (
    <button className={styleNames} onClick={onClickHandler} {...rest}>
      {children}
    </button>
  );
};

export default DropdownMenuContentItem;
