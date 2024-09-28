import './SelectTriggerIcon.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../../../utils/classNames';

export interface SelectTriggerIconProps
  extends ComponentPropsWithoutRef<'div'> {}

const SelectTriggerIcon: FC<SelectTriggerIconProps> = (props) => {
  const { className, children, ...rest } = props;

  return (
    <div className={classNames('select-trigger__icon', className)} {...rest}>
      {children}
    </div>
  );
};

export default SelectTriggerIcon;
