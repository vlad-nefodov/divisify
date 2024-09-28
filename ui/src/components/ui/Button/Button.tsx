import './Button.css';

import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from '../../../utils/classNames';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outline-secondary' | 'dashed-secondary';
  size?: 'lg';
}

const Button: FC<ButtonProps> = (props) => {
  const { variant, size, className, children, ...rest } = props;
  const styleNames = classNames(
    'btn',
    {
      [`btn--${variant}`]: variant,
      [`btn--${size}`]: size
    },
    className
  );

  return (
    <button className={styleNames} {...rest}>
      {children}
    </button>
  );
};

export default Button;
