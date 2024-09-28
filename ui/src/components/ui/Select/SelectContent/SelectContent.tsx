import './SelectContent.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import SelectContentItem from './SelectContentItem/SelectContentItem';
import classNames from '../../../../utils/classNames';

export interface SelectContentExtensions {
  Item: typeof SelectContentItem;
}
export interface SelectContentProps extends ComponentPropsWithoutRef<'div'> {}

const SelectContent: FC<SelectContentProps> & SelectContentExtensions = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div className={classNames('select__content', className)} {...rest}>
      {children}
    </div>
  );
};

SelectContent.Item = SelectContentItem;
export default SelectContent;
