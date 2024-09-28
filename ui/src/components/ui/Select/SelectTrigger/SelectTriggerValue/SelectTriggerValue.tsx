import './SelectTriggerValue.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../../../utils/classNames';
import { useSelectContext } from '../../SelectContext';

export interface SelectTriggerValueProps
  extends ComponentPropsWithoutRef<'div'> {
  placeholder?: string;
}

const SelectTriggerValue: FC<SelectTriggerValueProps> = (props) => {
  const { placeholder, className, ...rest } = props;
  const { valueNode, value } = useSelectContext();

  const isPlaceholder = valueNode === null || value === undefined;

  const styleNames = classNames(
    'select-trigger__value',
    {
      'select-trigger__value--placeholder': isPlaceholder
    },
    className
  );

  return (
    <div className={styleNames} {...rest}>
      {isPlaceholder ? placeholder : valueNode}
    </div>
  );
};

export default SelectTriggerValue;
