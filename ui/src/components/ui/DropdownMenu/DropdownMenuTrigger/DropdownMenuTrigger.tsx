import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../../utils/classNames';
import { useDropdownMenuContext } from '../DropdownMenuContext';

export interface DropdownMenuTriggerProps
  extends ComponentPropsWithoutRef<'div'> { }

const DropdownMenuTrigger: FC<DropdownMenuTriggerProps> = (props) => {
  const { className, children, ...rest } = props;
  const styleNames = classNames('dropdown-menu__trigger', className);

  const { isOpen, onOpenChange } = useDropdownMenuContext();

  const onClickHandler = () => onOpenChange(!isOpen);

  return (
    <div className={styleNames} onClick={onClickHandler} {...rest}>
      {children}
    </div>
  );
};

export default DropdownMenuTrigger;