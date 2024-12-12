import { ComponentPropsWithoutRef, FC } from 'react';

import Item from './Item/Item';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { useDropdownMenuContext } from '../DropdownMenuContext';

export interface ContentExtensions {
  Item: typeof Item;
}
export interface ContentProps extends ComponentPropsWithoutRef<'div'> {
  placementX?: 'left' | 'middle' | 'right';
  placementY?: 'top' | 'bottom';
}

const cx = classNames.bind(styles);

const Content: FC<ContentProps> & ContentExtensions = (props) => {
  const {
    placementX = 'right',
    placementY = 'bottom',
    className,
    children,
    ...rest
  } = props;

  const { isOpen } = useDropdownMenuContext();

  const styleNames = cx(
    'content',
    [`content-placement-x-${placementX}`],
    [`content-placement-y-${placementY}`],
    { 'content--visible': isOpen },
    className
  );

  return (
    <div className={styleNames} {...rest}>
      {children}
    </div>
  );
};

Content.Item = Item;
export default Content;
