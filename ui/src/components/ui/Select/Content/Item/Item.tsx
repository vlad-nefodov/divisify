import { ComponentPropsWithoutRef, FC, useEffect } from 'react';

import { SelectValue } from '../../Select.types';
import classNames from 'classnames/bind';
import styles from './Item.module.scss';
import { useSelectContext } from '../../SelectContext';

export interface ItemProps extends ComponentPropsWithoutRef<'div'> {
  value: SelectValue;
}

const cx = classNames.bind(styles);

const Item: FC<ItemProps> = (props) => {
  const { value, className, children, ...rest } = props;
  const {
    onControlledValueChange,
    onValueChange,
    value: controlledValue
  } = useSelectContext();

  useEffect(
    () => onControlledValueChange(value, children),
    [children, controlledValue, value, onControlledValueChange]
  );

  const onClickHandler = () => onValueChange(value, children);

  return (
    <div className={cx('item', className)} onClick={onClickHandler} {...rest}>
      {children}
    </div>
  );
};

export default Item;
