import { ComponentPropsWithoutRef, FC } from 'react';

import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'outline-secondary' | 'dashed-secondary';
  size?: 'lg';
}

const cx = classNames.bind(styles);

const Button: FC<ButtonProps> = (props) => {
  const { variant, size, className, children, ...rest } = props;
  const styleNames = cx(
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
