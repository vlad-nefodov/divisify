import './IconButton.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../utils/classNames';

export interface IconButtonProps extends ComponentPropsWithoutRef<'button'> {
  size?: 'sm';
}

const IconButton: FC<IconButtonProps> = (props) => {
  const { size, className, children, ...rest } = props;
  const styleNames = classNames(
    'icon-btn',
    {
      [`icon-btn--${size}`]: size
    },
    className
  );

  return (
    <button className={styleNames} {...rest}>
      {children}
    </button>
  );
};

export default IconButton;
