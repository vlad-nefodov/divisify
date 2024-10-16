import { ComponentPropsWithoutRef, FC } from 'react';

import Icon from './Icon/Icon';
import Value from './Value/Value';
import classNames from 'classnames/bind';
import styles from './Trigger.module.scss';
import { useSelectContext } from '../SelectContext';

export interface TriggerExtensions {
  Value: typeof Value;
  Icon: typeof Icon;
}
export interface TriggerProps extends ComponentPropsWithoutRef<'div'> {}

const cx = classNames.bind(styles);

const Trigger: FC<TriggerProps> & TriggerExtensions = ({
  className,
  children,
  ...rest
}) => {
  const { isOpen, onOpenChange } = useSelectContext();

  const onClickHandler = () => onOpenChange(!isOpen);

  const styleNames = cx('trigger', { 'trigger--active': isOpen }, className);

  return (
    <div className={styleNames} onClick={onClickHandler} {...rest}>
      {children}
    </div>
  );
};

Trigger.Value = Value;
Trigger.Icon = Icon;
export default Trigger;
