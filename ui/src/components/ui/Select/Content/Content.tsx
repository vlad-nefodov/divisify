import { ComponentPropsWithoutRef, FC } from 'react';

import Item from './Item/Item';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { useSelectContext } from '../SelectContext';

export interface ContentExtensions {
  Item: typeof Item;
}
export interface ContentProps extends ComponentPropsWithoutRef<'div'> {}

const cx = classNames.bind(styles);

const Content: FC<ContentProps> & ContentExtensions = ({
  className,
  children,
  ...rest
}) => {
  const { isOpen } = useSelectContext();

  const styleNames = cx('content', { 'content--visible': isOpen }, className);

  return (
    <div className={styleNames} {...rest}>
      {children}
    </div>
  );
};

Content.Item = Item;
export default Content;
