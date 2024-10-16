import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './Value.module.scss';
import { useSelectContext } from '../../SelectContext';

export interface ValueProps extends ComponentPropsWithoutRef<'div'> {
  placeholder?: string;
}

const cx = classNames.bind(styles);

const Value: FC<ValueProps> = (props) => {
  const { placeholder, className, ...rest } = props;

  const { valueNode, value } = useSelectContext();

  const isPlaceholder = valueNode === null || value === undefined;
  const styleNames = cx(
    'value',
    { 'value--placeholder': isPlaceholder },
    className
  );

  return (
    <div className={styleNames} {...rest}>
      {isPlaceholder ? placeholder : valueNode}
    </div>
  );
};

export default Value;
