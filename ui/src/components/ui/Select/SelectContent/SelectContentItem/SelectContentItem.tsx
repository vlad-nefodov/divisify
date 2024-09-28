import './SelectContentItem.css';

import { ComponentPropsWithoutRef, FC, useEffect } from 'react';

import { SelectValue } from '../../Select.types';
import classNames from '../../../../../utils/classNames';
import { useSelectContext } from '../../SelectContext';

export interface SelectContentItemProps
  extends ComponentPropsWithoutRef<'div'> {
  value: SelectValue;
}

const SelectContentItem: FC<SelectContentItemProps> = (props) => {
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
    <div
      className={classNames('select-content__item', className)}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SelectContentItem;
