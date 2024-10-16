import { ComponentPropsWithoutRef, FC } from 'react';

import { useDropdownMenuContext } from '../DropdownMenuContext';

export interface TriggerProps extends ComponentPropsWithoutRef<'div'> {}

const Trigger: FC<TriggerProps> = (props) => {
  const { className, children, ...rest } = props;

  const { isOpen, onOpenChange } = useDropdownMenuContext();

  const onClickHandler = () => onOpenChange(!isOpen);

  return (
    <div className={className} onClick={onClickHandler} {...rest}>
      {children}
    </div>
  );
};

export default Trigger;
