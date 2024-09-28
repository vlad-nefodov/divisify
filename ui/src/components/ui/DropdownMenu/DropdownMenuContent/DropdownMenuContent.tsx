import './DropdownMenuContent.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import DropdownMenuContentItem
  from './DropdownMenuContentItem/DropdownMenuContentItem';
import classNames from '../../../../utils/classNames';

export interface DropdownMenuContentExtensions {
  Item: typeof DropdownMenuContentItem;
}
export interface DropdownMenuContentProps
  extends ComponentPropsWithoutRef<'div'> {
  align?: 'left' | 'center' | 'right';
}

const DropdownMenuContent:
  FC<DropdownMenuContentProps> &
  DropdownMenuContentExtensions = (props) => {
    const { align, className, children, ...rest } = props;
    const styleNames = classNames('dropdown-menu__content', {
      [`dropdown-menu__content--align-${align}`]: align
    }, className);

    return (
      <div className={styleNames} {...rest}>
        {children}
      </div>
    );
  };

DropdownMenuContent.Item = DropdownMenuContentItem;
export default DropdownMenuContent;