import './SelectTrigger.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import SelectTriggerIcon from './SelectTriggerIcon/SelectTriggerIcon';
import SelectTriggerValue from './SelectTriggerValue/SelectTriggerValue';
import classNames from '../../../../utils/classNames';
import { useSelectContext } from '../SelectContext';

export interface SelectTriggerExtensions {
  Value: typeof SelectTriggerValue;
  Icon: typeof SelectTriggerIcon;
}
export interface SelectTriggerProps extends ComponentPropsWithoutRef<'div'> {}

const SelectTrigger: FC<SelectTriggerProps> & SelectTriggerExtensions = ({
  className,
  children,
  ...rest
}) => {
  const { isOpen, onOpenChange } = useSelectContext();
  const onClickHandler = () => onOpenChange(!isOpen);

  return (
    <div
      className={classNames('select__trigger', className)}
      onClick={onClickHandler}
      {...rest}
    >
      {children}
    </div>
  );
};

SelectTrigger.Value = SelectTriggerValue;
SelectTrigger.Icon = SelectTriggerIcon;
export default SelectTrigger;
