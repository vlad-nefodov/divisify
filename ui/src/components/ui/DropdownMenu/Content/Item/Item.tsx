import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { useDropdownMenuContext } from '../../DropdownMenuContext';

export interface ItemProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'danger';
}

const cx = classNames.bind(styles);

const Item: FC<ItemProps> = (props) => {
  const { variant, onClick, className, children, ...rest } = props;

  const { onOpenChange } = useDropdownMenuContext();

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    onClick?.(e);
    onOpenChange(false);
  };

  const styleNames = cx('item', { [`item--${variant}`]: variant }, className);

  return (
    <button className={styleNames} onClick={onClickHandler} {...rest}>
      {children}
    </button>
  );
};

export default Item;
