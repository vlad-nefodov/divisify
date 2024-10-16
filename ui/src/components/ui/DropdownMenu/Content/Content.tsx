import { ComponentPropsWithoutRef, FC } from 'react';

import Item from './Item/Item';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { useDropdownMenuContext } from '../DropdownMenuContext';

export interface ContentExtensions {
  Item: typeof Item;
}
export interface ContentProps extends ComponentPropsWithoutRef<'div'> {
  align?: 'left' | 'center' | 'right';
}

const cx = classNames.bind(styles);

const Content: FC<ContentProps> & ContentExtensions = (props) => {
  const { align, className, children, ...rest } = props;

  const { isOpen } = useDropdownMenuContext();

  const styleNames = cx(
    'content',
    { 'content--visible': isOpen, [`content--${align}`]: align },
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
